'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
  MessageSquare,
  Mail,
  RefreshCw,
  Trash2,
  Eye,
  Copy,
  Download,
  Search,
  Users,
  ArrowLeft,
  ShieldCheck,
  Clock,
  Loader2,
  Phone,
  CheckCircle2,
  XCircle,
  LogOut,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  createdAt: string;
}

interface NewsletterSignup {
  id: string;
  email: string;
  source: string;
  active: boolean;
  createdAt: string;
}

interface AdminData {
  contacts: ContactSubmission[];
  newsletters: NewsletterSignup[];
  totals: { contacts: number; newsletters: number };
}

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatRelative(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);
  if (diffMin < 1) return 'agora';
  if (diffMin < 60) return `${diffMin}min atrás`;
  if (diffHr < 24) return `${diffHr}h atrás`;
  if (diffDay < 7) return `${diffDay}d atrás`;
  return formatDate(iso);
}

function exportCSV(data: Record<string, string | boolean>[], filename: string) {
  if (data.length === 0) {
    toast.error('Nenhum dado para exportar.');
    return;
  }
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((h) => {
          const val = String(row[h] ?? '');
          return val.includes(',') || val.includes('"')
            ? `"${val.replace(/"/g, '""')}"`
            : val;
        })
        .join(',')
    ),
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  toast.success('Arquivo CSV exportado com sucesso.');
}

/* ═══════════════════════════════════════════════════════════
   LOGIN SCREEN
   ═══════════════════════════════════════════════════════════ */
function LoginScreen({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao autenticar.');
        return;
      }

      toast.success('Autenticado com sucesso!');
      onAuth();
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgba(139,30,45,0.04)] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[rgba(139,30,45,0.03)] rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(139,30,45,0.12)] border border-[rgba(139,30,45,0.2)] mb-5">
            <ShieldCheck className="h-8 w-8 text-[var(--crimson-lt)]" />
          </div>
          <h1 className="font-serif text-2xl text-[var(--editorial)] mb-2">
            Advologos
          </h1>
          <p className="text-[13px] text-[var(--nevoa)]">
            Painel Administrativo
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-[rgba(184,196,204,0.08)] bg-[var(--ardosia)]">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-3.5 w-3.5 text-[var(--nevoa)]" />
                  <label htmlFor="admin-password" className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)]">
                    Senha de acesso
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Digite a senha do painel"
                    autoFocus
                    className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(184,196,204,0.15)] rounded-xl py-3.5 px-4 pr-12 text-[var(--editorial)] text-sm placeholder:text-[var(--nevoa)] focus:border-[var(--crimson)] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--nevoa)] hover:text-[var(--prata)] transition-colors text-[12px] cursor-pointer"
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.15)]">
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                  <span className="text-[13px] text-red-400">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password.trim()}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--crimson)] text-[var(--editorial)] text-[12px] font-bold tracking-[0.1em] uppercase py-3.5 border-none cursor-pointer transition-all duration-300 hover:bg-[var(--crimson-dp)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Entrar no painel
                  </>
                )}
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[12px] text-[var(--nevoa)] hover:text-[var(--editorial)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════════════════════ */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'contact' | 'newsletter' | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/submissions');
      if (res.status === 401) return; // session expired — handled by parent
      if (!res.ok) throw new Error('Erro ao carregar dados');
      const json = await res.json();
      setData(json);
    } catch {
      toast.error('Erro ao carregar dados do painel.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // ignore
    }
    onLogout();
  };

  const handleDelete = async () => {
    if (!deleteId || !deleteType) return;
    setDeleting(true);
    try {
      const endpoint =
        deleteType === 'contact'
          ? `/api/admin/contact/${deleteId}`
          : `/api/admin/newsletter/${deleteId}`;
      const res = await fetch(endpoint, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Registro excluído com sucesso.');
      setData((prev) => {
        if (!prev) return prev;
        if (deleteType === 'contact') {
          return {
            ...prev,
            contacts: prev.contacts.filter((c) => c.id !== deleteId),
            totals: { ...prev.totals, contacts: prev.totals.contacts - 1 },
          };
        }
        return {
          ...prev,
          newsletters: prev.newsletters.filter((n) => n.id !== deleteId),
          totals: { ...prev.totals, newsletters: prev.totals.newsletters - 1 },
        };
      });
    } catch {
      toast.error('Erro ao excluir registro.');
    } finally {
      setDeleting(false);
      setDeleteId(null);
      setDeleteType(null);
    }
  };

  const handleToggle = async (item: NewsletterSignup) => {
    setTogglingId(item.id);
    try {
      const res = await fetch(`/api/admin/newsletter/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !item.active }),
      });
      if (!res.ok) throw new Error();
      toast.success(item.active ? 'Inscrição desativada.' : 'Inscrição reativada.');
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          newsletters: prev.newsletters.map((n) =>
            n.id === item.id ? { ...n, active: !n.active } : n
          ),
        };
      });
    } catch {
      toast.error('Erro ao alterar status.');
    } finally {
      setTogglingId(null);
    }
  };

  const exportContacts = () => {
    if (!data) return;
    exportCSV(
      data.contacts.map((c) => ({
        Nome: c.name,
        Email: c.email,
        WhatsApp: c.whatsapp,
        Mensagem: c.message,
        Data: formatDate(c.createdAt),
      })),
      'contatos_advologos'
    );
  };

  const exportNewsletters = () => {
    if (!data) return;
    exportCSV(
      data.newsletters.map((n) => ({
        Email: n.email,
        Origem: n.source,
        Ativo: n.active ? 'Sim' : 'Não',
        Data: formatDate(n.createdAt),
      })),
      'newsletter_advologos'
    );
  };

  const filteredContacts = (data?.contacts ?? []).filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.whatsapp.includes(search) ||
      c.message.toLowerCase().includes(search.toLowerCase())
  );

  const filteredNewsletters = (data?.newsletters ?? []).filter((n) =>
    n.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b border-[rgba(184,196,204,0.1)] bg-[var(--grafite)]/90 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 text-[var(--nevoa)] hover:text-[var(--editorial)] transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-[12px] font-medium tracking-[0.06em] uppercase hidden sm:inline">
                Voltar ao site
              </span>
            </a>
            <div className="w-px h-5 bg-[rgba(184,196,204,0.12)]" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[var(--crimson-lt)]" />
              <h1 className="font-serif text-lg text-[var(--editorial)]">
                Painel Administrativo
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchData}
              disabled={loading}
              className="text-[var(--nevoa)] hover:text-[var(--editorial)]"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Atualizar</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-[var(--nevoa)] hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-5 md:px-8 py-6 md:py-8">
        {/* Stats */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[120px] rounded-xl" />
            ))}
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-[rgba(184,196,204,0.08)] bg-[var(--ardosia)]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--nevoa)] mb-2">Contatos</p>
                    <p className="text-3xl font-bold text-[var(--editorial)]">{data.totals.contacts}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(139,30,45,0.12)]">
                    <MessageSquare className="h-5 w-5 text-[var(--crimson-lt)]" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[var(--nevoa)]">
                  <Users className="h-3 w-3" /><span>mensagens recebidas</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[rgba(184,196,204,0.08)] bg-[var(--ardosia)]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--nevoa)] mb-2">Newsletter</p>
                    <p className="text-3xl font-bold text-[var(--editorial)]">{data.totals.newsletters}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(139,30,45,0.12)]">
                    <Mail className="h-5 w-5 text-[var(--crimson-lt)]" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[var(--nevoa)]">
                  <CheckCircle2 className="h-3 w-3" /><span>inscrições ativas</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[rgba(184,196,204,0.08)] bg-[var(--ardosia)]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--nevoa)] mb-2">Último contato</p>
                    <p className="text-sm font-semibold text-[var(--editorial)]">
                      {data.contacts[0] ? data.contacts[0].name : '—'}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(139,30,45,0.12)]">
                    <Clock className="h-5 w-5 text-[var(--crimson-lt)]" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[var(--nevoa)]">
                  <span>{data.contacts[0] ? formatRelative(data.contacts[0].createdAt) : '—'}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[rgba(184,196,204,0.08)] bg-[var(--ardosia)]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--nevoa)] mb-2">Última inscrição</p>
                    <p className="text-sm font-semibold text-[var(--editorial)] truncate max-w-[180px]">
                      {data.newsletters[0] ? data.newsletters[0].email : '—'}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(139,30,45,0.12)]">
                    <Mail className="h-5 w-5 text-[var(--crimson-lt)]" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[var(--nevoa)]">
                  <span>{data.newsletters[0] ? formatRelative(data.newsletters[0].createdAt) : '—'}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* Tabs */}
        <Tabs defaultValue="contacts" className="w-full sm:w-auto">
          <TabsList className="bg-[var(--ardosia)] border border-[rgba(184,196,204,0.08)]">
            <TabsTrigger value="contacts" className="gap-1.5 data-[state=active]:bg-[rgba(139,30,45,0.15)] data-[state=active]:text-[var(--crimson-lt)]">
              <MessageSquare className="h-3.5 w-3.5" />
              Contatos
              {data && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 text-[10px] px-1.5">
                  {data.totals.contacts}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="gap-1.5 data-[state=active]:bg-[rgba(139,30,45,0.15)] data-[state=active]:text-[var(--crimson-lt)]">
              <Mail className="h-3.5 w-3.5" />
              Newsletter
              {data && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 text-[10px] px-1.5">
                  {data.totals.newsletters}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ── Contacts Tab ── */}
          <TabsContent value="contacts">
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--nevoa)]" />
                <input
                  type="text"
                  placeholder="Buscar contatos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[var(--ardosia)] border border-[rgba(184,196,204,0.1)] rounded-lg pl-9 pr-4 py-2 text-[13px] text-[var(--editorial)] placeholder:text-[var(--nevoa)] focus:border-[var(--crimson)] focus:outline-none transition-colors"
                />
              </div>
              <Button variant="outline" size="sm" onClick={exportContacts} disabled={!data || data.contacts.length === 0} className="text-[var(--nevoa)] border-[rgba(184,196,204,0.12)] hover:text-[var(--editorial)]">
                <Download className="h-3.5 w-3.5" /> Exportar CSV
              </Button>
            </div>

            {loading ? (
              <div className="mt-4 space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)}</div>
            ) : filteredContacts.length === 0 ? (
              <div className="mt-12 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-[var(--nevoa)] opacity-30 mb-3" />
                <p className="text-[var(--nevoa)] text-sm">{search ? 'Nenhum contato encontrado.' : 'Nenhum contato recebido ainda.'}</p>
              </div>
            ) : (
              <Card className="mt-4 border-[rgba(184,196,204,0.08)] bg-[var(--ardosia)] overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-[rgba(184,196,204,0.08)] hover:bg-transparent">
                        <TableHead className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)]">Nome</TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)]">E-mail</TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)] hidden md:table-cell">WhatsApp</TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)] hidden lg:table-cell">Mensagem</TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)]">Data</TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)] text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContacts.map((contact) => (
                        <TableRow key={contact.id} className="border-b-[rgba(184,196,204,0.05)]">
                          <TableCell className="font-medium text-[var(--editorial)] text-[13px]">{contact.name}</TableCell>
                          <TableCell>
                            <button onClick={() => { navigator.clipboard.writeText(contact.email); toast.success('E-mail copiado!'); }} className="flex items-center gap-1.5 text-[13px] text-[var(--nevoa)] hover:text-[var(--crimson-lt)] transition-colors">
                              <Copy className="h-3 w-3" />{contact.email}
                            </button>
                          </TableCell>
                          <TableCell className="hidden md:table-cell"><span className="text-[13px] text-[var(--nevoa)]">{contact.whatsapp}</span></TableCell>
                          <TableCell className="hidden lg:table-cell"><span className="text-[12px] text-[var(--nevoa)] line-clamp-1 max-w-[200px] block">{contact.message}</span></TableCell>
                          <TableCell><span className="text-[12px] text-[var(--nevoa)] whitespace-nowrap" title={formatDate(contact.createdAt)}>{formatRelative(contact.createdAt)}</span></TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--nevoa)] hover:text-[var(--crimson-lt)]" onClick={() => setSelectedContact(contact)}>
                                <Eye className="h-3.5 w-3.5" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--nevoa)] hover:text-red-400" onClick={() => { setDeleteId(contact.id); setDeleteType('contact'); }}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </AlertDialogTrigger>
                                {deleteId === contact.id && deleteType === 'contact' && (
                                  <AlertDialogContent className="bg-[var(--ardosia)] border-[rgba(184,196,204,0.1)]">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-[var(--editorial)]">Excluir contato</AlertDialogTitle>
                                      <AlertDialogDescription className="text-[var(--nevoa)]">Tem certeza que deseja excluir a mensagem de <strong className="text-[var(--editorial)]">{contact.name}</strong>? Esta ação não pode ser desfeita.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="border-[rgba(184,196,204,0.12)] text-[var(--nevoa)]" onClick={() => { setDeleteId(null); setDeleteType(null); }}>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={handleDelete} disabled={deleting} className="bg-red-600 hover:bg-red-700 text-white">{deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Excluir'}</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                )}
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* ── Newsletter Tab ── */}
          <TabsContent value="newsletter">
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--nevoa)]" />
                <input
                  type="text"
                  placeholder="Buscar e-mails..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[var(--ardosia)] border border-[rgba(184,196,204,0.1)] rounded-lg pl-9 pr-4 py-2 text-[13px] text-[var(--editorial)] placeholder:text-[var(--nevoa)] focus:border-[var(--crimson)] focus:outline-none transition-colors"
                />
              </div>
              <Button variant="outline" size="sm" onClick={exportNewsletters} disabled={!data || data.newsletters.length === 0} className="text-[var(--nevoa)] border-[rgba(184,196,204,0.12)] hover:text-[var(--editorial)]">
                <Download className="h-3.5 w-3.5" /> Exportar CSV
              </Button>
            </div>

            {loading ? (
              <div className="mt-4 space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)}</div>
            ) : filteredNewsletters.length === 0 ? (
              <div className="mt-12 text-center">
                <Mail className="h-12 w-12 mx-auto text-[var(--nevoa)] opacity-30 mb-3" />
                <p className="text-[var(--nevoa)] text-sm">{search ? 'Nenhum e-mail encontrado.' : 'Nenhuma inscrição na newsletter.'}</p>
              </div>
            ) : (
              <Card className="mt-4 border-[rgba(184,196,204,0.08)] bg-[var(--ardosia)] overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-[rgba(184,196,204,0.08)] hover:bg-transparent">
                        <TableHead className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)]">E-mail</TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)] hidden sm:table-cell">Origem</TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)]">Status</TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)]">Data</TableHead>
                        <TableHead className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[var(--nevoa)] text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNewsletters.map((item) => (
                        <TableRow key={item.id} className="border-b-[rgba(184,196,204,0.05)]">
                          <TableCell>
                            <button onClick={() => { navigator.clipboard.writeText(item.email); toast.success('E-mail copiado!'); }} className="flex items-center gap-1.5 text-[13px] text-[var(--editorial)] hover:text-[var(--crimson-lt)] transition-colors">
                              <Copy className="h-3 w-3" />{item.email}
                            </button>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline" className="text-[10px] font-medium tracking-wider uppercase border-[rgba(184,196,204,0.12)] text-[var(--nevoa)]">{item.source}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={item.active ? 'default' : 'secondary'} className={item.active ? 'bg-[rgba(34,197,94,0.15)] text-green-400 border-green-500/20 text-[10px]' : 'bg-[rgba(239,68,68,0.1)] text-red-400 border-red-500/20 text-[10px]'}>
                              {item.active ? <span className="flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5" /> Ativo</span> : <span className="flex items-center gap-1"><XCircle className="h-2.5 w-2.5" /> Inativo</span>}
                            </Badge>
                          </TableCell>
                          <TableCell><span className="text-[12px] text-[var(--nevoa)] whitespace-nowrap" title={formatDate(item.createdAt)}>{formatRelative(item.createdAt)}</span></TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--nevoa)] hover:text-[var(--crimson-lt)]" onClick={() => handleToggle(item)} disabled={togglingId === item.id} title={item.active ? 'Desativar' : 'Reativar'}>
                                {togglingId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : item.active ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--nevoa)] hover:text-red-400" onClick={() => { setDeleteId(item.id); setDeleteType('newsletter'); }}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </AlertDialogTrigger>
                                {deleteId === item.id && deleteType === 'newsletter' && (
                                  <AlertDialogContent className="bg-[var(--ardosia)] border-[rgba(184,196,204,0.1)]">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-[var(--editorial)]">Excluir inscrição</AlertDialogTitle>
                                      <AlertDialogDescription className="text-[var(--nevoa)]">Tem certeza que deseja excluir o e-mail <strong className="text-[var(--editorial)]">{item.email}</strong>? Esta ação não pode ser desfeita.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="border-[rgba(184,196,204,0.12)] text-[var(--nevoa)]" onClick={() => { setDeleteId(null); setDeleteType(null); }}>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={handleDelete} disabled={deleting} className="bg-red-600 hover:bg-red-700 text-white">{deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Excluir'}</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                )}
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* ─── Contact Detail Dialog ─── */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="bg-[var(--ardosia)] border-[rgba(184,196,204,0.1)] max-w-lg">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[var(--editorial)] flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[var(--crimson-lt)]" />
                  Detalhes do contato
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--nevoa)]">Nome</label>
                    <p className="text-[14px] text-[var(--editorial)] mt-1">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--nevoa)]">E-mail</label>
                    <button onClick={() => { navigator.clipboard.writeText(selectedContact.email); toast.success('E-mail copiado!'); }} className="flex items-center gap-1.5 text-[14px] text-[var(--crimson-lt)] mt-1 hover:underline">{selectedContact.email} <Copy className="h-3 w-3" /></button>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--nevoa)]">WhatsApp</label>
                    <button onClick={() => { navigator.clipboard.writeText(selectedContact.whatsapp); toast.success('WhatsApp copiado!'); }} className="flex items-center gap-1.5 text-[14px] text-[var(--crimson-lt)] mt-1 hover:underline">{selectedContact.whatsapp} <Copy className="h-3 w-3" /></button>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--nevoa)]">Recebido em</label>
                    <p className="text-[14px] text-[var(--editorial)] mt-1 flex items-center gap-1.5"><Clock className="h-3 w-3 text-[var(--nevoa)]" />{formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--nevoa)]">Mensagem</label>
                  <div className="mt-1.5 p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(184,196,204,0.08)] rounded-lg">
                    <p className="text-[14px] text-[var(--prata)] leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <a href={`https://wa.me/55${selectedContact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-[12px] font-semibold tracking-[0.06em] uppercase py-2.5 px-4 transition-colors">
                    <Phone className="h-4 w-4" /> Abrir no WhatsApp
                  </a>
                  <a href={`mailto:${selectedContact.email}`} className="inline-flex items-center gap-2 rounded-lg bg-[var(--ardosia-md)] hover:bg-[rgba(184,196,204,0.2)] text-[var(--editorial)] text-[12px] font-semibold tracking-[0.06em] uppercase py-2.5 px-4 border border-[rgba(184,196,204,0.12)] transition-colors">
                    <Mail className="h-4 w-4" /> Enviar e-mail
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE — AUTH GATE
   ═══════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) setAuthenticated(true);
      })
      .catch(() => { /* ignore */ })
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-[var(--crimson-lt)] animate-spin" />
          <p className="text-[13px] text-[var(--nevoa)]">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onAuth={() => setAuthenticated(true)} />;
  }

  return <Dashboard onLogout={() => setAuthenticated(false)} />;
}
