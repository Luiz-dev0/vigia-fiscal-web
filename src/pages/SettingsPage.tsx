import { useState } from 'react';
import { Eye, EyeOff, Lock, LogOut, Shield, Trash2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// ── helper: iniciais (mesmo padrão do DashboardLayout) ────────────────────
function getInitials(nome?: string | null) {
  if (!nome) return 'VF';
  return nome
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// ── campo somente leitura ─────────────────────────────────────────────────
function ReadonlyField({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        {label}
      </label>
      <div className="rounded-[16px] border-2 border-slate-50 bg-slate-50 px-5 py-3.5 text-sm font-medium text-slate-500 select-none">
        {value ?? '—'}
      </div>
    </div>
  );
}

// ── campo de senha com olhinho ────────────────────────────────────────────
interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}

function PasswordField({ label, value, onChange, placeholder, error }: PasswordFieldProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? '••••••••'}
          className={`w-full rounded-[16px] border-2 px-5 py-3.5 pr-12 text-sm font-medium text-slate-700 placeholder-slate-300 outline-none transition-all focus:ring-4 focus:ring-blue-900/5 ${
            error
              ? 'border-red-300 focus:border-red-400'
              : 'border-slate-50 bg-slate-50 focus:border-vigia-blue focus:bg-white'
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          tabIndex={-1}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-[11px] font-bold text-red-500 mt-0.5 pl-1">{error}</p>}
    </div>
  );
}

// ── card de seção ─────────────────────────────────────────────────────────
function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm shadow-slate-900/5 p-8 md:p-10">
      <div className="flex items-center gap-3 mb-7">
        <span className="text-vigia-navy">{icon}</span>
        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-800">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

// ── modal de confirmação de exclusão ──────────────────────────────────────
function DeleteConfirmModal({
  open,
  onCancel,
  onConfirm,
  loading,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-900/20 p-10 max-w-sm w-full mx-4 border border-slate-100">
        <div className="flex items-center justify-center w-16 h-16 rounded-[20px] bg-red-50 mx-auto mb-5">
          <Trash2 size={26} className="text-red-500" />
        </div>
        <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-slate-900 text-center mb-3">
          Excluir conta
        </h3>
        <p className="text-sm font-medium text-slate-500 text-center mb-8 leading-relaxed">
          Esta ação é <span className="font-black text-slate-800">irreversível</span>. Todos
          os seus dados serão permanentemente apagados.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full py-4 rounded-[20px] bg-red-500 text-white text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-all disabled:opacity-60"
          >
            {loading ? 'Excluindo...' : 'Sim, excluir minha conta'}
          </button>
          <button
            onClick={onCancel}
            className="w-full py-4 rounded-[20px] border-2 border-slate-100 text-slate-500 text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── página principal ──────────────────────────────────────────────────────
export function SettingsPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // segurança
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  // ── handlers ─────────────────────────────────────────────────────────
  function handleSavePassword() {
    const errs: Record<string, string> = {};
    if (!currentPassword) errs.current = 'Informe a senha atual.';
    if (!newPassword || newPassword.length < 8)
      errs.new = 'A nova senha deve ter ao menos 8 caracteres.';
    if (newPassword !== confirmPassword) errs.confirm = 'As senhas não coincidem.';

    setPasswordErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSavingPassword(true);
    // TODO: chamar endpoint de troca de senha
    setTimeout(() => {
      setSavingPassword(false);
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(false), 4000);
    }, 1200);
  }

  async function handleDeleteAccount() {
    setDeletingAccount(true);
    // TODO: chamar endpoint de exclusão de conta
    await new Promise((r) => setTimeout(r, 1500));
    signOut();
    navigate('/login');
  }

  function handleLogout() {
    signOut();
    navigate('/login');
  }

  const initials = getInitials(user?.nome);

  // ── render ────────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* cabeçalho da página */}
      <div className="mb-2">
        <h1 className="text-2xl font-black uppercase tracking-widest text-slate-900 leading-none">
          Configurações
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-2">
          Gerencie seu perfil, segurança e preferências da conta.
        </p>
      </div>

      {/* ── PERFIL ──────────────────────────────────────────────────── */}
      <Section icon={<User size={18} />} title="Perfil">
        <div className="flex items-center gap-4 mb-7 p-5 bg-slate-50 rounded-[20px]">
          <div className="w-14 h-14 rounded-[16px] bg-blue-50 flex items-center justify-center text-vigia-blue font-black text-lg shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-black text-slate-900 text-base leading-none truncate">
              {user?.nome ?? 'Usuário'}
            </p>
            <p className="text-xs font-medium text-slate-400 mt-1 truncate">
              {user?.email ?? ''}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReadonlyField label="Nome completo" value={user?.nome} />
          <ReadonlyField label="E-mail" value={user?.email} />
          <ReadonlyField label="WhatsApp" value={(user as any)?.whatsapp} />
        </div>
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-5">
          Para alterar seus dados, entre em contato com o suporte.
        </p>
      </Section>

      {/* ── SEGURANÇA ───────────────────────────────────────────────── */}
      <Section icon={<Lock size={18} />} title="Segurança — Alterar senha">
        <div className="space-y-4">
          <PasswordField
            label="Senha atual"
            value={currentPassword}
            onChange={setCurrentPassword}
            error={passwordErrors.current}
          />
          <PasswordField
            label="Nova senha"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Mín. 8 caracteres"
            error={passwordErrors.new}
          />
          <PasswordField
            label="Confirmar nova senha"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={passwordErrors.confirm}
          />

          {passwordSuccess && (
            <div className="p-4 bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest rounded-[16px] border border-emerald-100">
              ✓ Senha alterada com sucesso!
            </div>
          )}

          <button
            onClick={handleSavePassword}
            disabled={savingPassword}
            className="px-8 py-4 rounded-[20px] bg-gradient-to-r from-vigia-navy to-vigia-blue text-white text-[11px] font-black uppercase tracking-widest hover:shadow-xl hover:shadow-blue-900/20 transition-all disabled:opacity-60 mt-2"
          >
            {savingPassword ? 'Salvando...' : 'Salvar nova senha'}
          </button>
        </div>
      </Section>

      {/* ── SAIR DA CONTA ───────────────────────────────────────────── */}
      <Section icon={<LogOut size={18} />} title="Sair da conta">
        <p className="text-sm font-medium text-slate-400 mb-5">
          Você será desconectado desta sessão.
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-8 py-4 rounded-[20px] border-2 border-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all"
        >
          <LogOut size={16} />
          Sair da conta
        </button>
      </Section>

      {/* ── CONTA / ZONA DE PERIGO ───────────────────────────────────── */}
      <Section icon={<Shield size={18} />} title="Zona de perigo">
        <p className="text-sm font-medium text-slate-400 mb-5">
          A exclusão é permanente e não pode ser desfeita. Todos os dados serão removidos.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-3 px-8 py-4 rounded-[20px] bg-red-50 border-2 border-red-100 text-red-500 text-[11px] font-black uppercase tracking-widest hover:bg-red-100 hover:text-red-600 transition-all"
        >
          <Trash2 size={16} />
          Excluir minha conta
        </button>
      </Section>

      <DeleteConfirmModal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        loading={deletingAccount}
      />
    </div>
  );
}