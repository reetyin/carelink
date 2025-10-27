// Simple client-side auth utilities using localStorage (demo only)
// Keys
const USERS_KEY = 'users'; // map email -> user record
const CURRENT_USER_KEY = 'currentUser'; // email string
const VERIFY_TOKENS_KEY = 'verifyTokens'; // map token -> email
const RESET_TOKENS_KEY = 'resetTokens'; // map token -> email

export type UserRecord = {
  email: string;
  password: string;
  verified: boolean;
  role?: 'Parent' | 'Provider';
  profile?: any;
  children?: any[];
  providerProfile?: any;
};

type UsersMap = Record<string, UserRecord>;

type TokensMap = Record<string, string>;

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getUsers(): UsersMap {
  return readJSON<UsersMap>(USERS_KEY, {});
}

export function saveUsers(users: UsersMap) {
  writeJSON(USERS_KEY, users);
}

export function createUser(email: string, password: string): UserRecord {
  const users = getUsers();
  if (users[email]) throw new Error('User already exists');
  const rec: UserRecord = { email, password, verified: false };
  users[email] = rec;
  saveUsers(users);
  return rec;
}

export function getUser(email: string): UserRecord | undefined {
  return getUsers()[email];
}

export function setVerified(email: string, verified = true) {
  const users = getUsers();
  if (users[email]) {
    users[email].verified = verified;
    saveUsers(users);
  }
}

export function setRole(email: string, role: 'Parent' | 'Provider') {
  const users = getUsers();
  if (users[email]) {
    users[email].role = role;
    saveUsers(users);
  }
}

export function setProfile(email: string, profile: any) {
  const users = getUsers();
  if (users[email]) {
    users[email].profile = profile;
    saveUsers(users);
  }
}

export function setChildren(email: string, children: any[]) {
  const users = getUsers();
  if (users[email]) {
    users[email].children = children;
    saveUsers(users);
  }
}

export function setProviderProfile(email: string, providerProfile: any) {
  const users = getUsers();
  if (users[email]) {
    users[email].providerProfile = providerProfile;
    saveUsers(users);
  }
}

export function mergeProviderProfile(email: string, partial: any) {
  const users = getUsers();
  if (users[email]) {
    users[email].providerProfile = { ...(users[email].providerProfile || {}), ...(partial || {}) };
    saveUsers(users);
  }
}

export function setCurrentUser(email: string | null) {
  if (typeof window === 'undefined') return;
  if (email) window.localStorage.setItem(CURRENT_USER_KEY, email);
  else window.localStorage.removeItem(CURRENT_USER_KEY);
  // backwards-compat for existing pages
  if (email) window.localStorage.setItem('user', JSON.stringify({ email }));
  else window.localStorage.removeItem('user');
}

export function getCurrentUserEmail(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(CURRENT_USER_KEY);
}

export function login(email: string, password: string): UserRecord {
  const rec = getUser(email);
  if (!rec || rec.password !== password) throw new Error('Invalid credentials');
  setCurrentUser(email);
  return rec;
}

export function logout() {
  setCurrentUser(null);
}

export function isAuthenticated(): boolean {
  return !!getCurrentUserEmail();
}

function genToken(): string {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

export function createVerifyToken(email: string): string {
  const tokens = readJSON<TokensMap>(VERIFY_TOKENS_KEY, {});
  const token = genToken();
  tokens[token] = email;
  writeJSON(VERIFY_TOKENS_KEY, tokens);
  return token;
}

export function consumeVerifyToken(token: string): string | null {
  const tokens = readJSON<TokensMap>(VERIFY_TOKENS_KEY, {});
  const email = tokens[token] || null;
  if (email) {
    delete tokens[token];
    writeJSON(VERIFY_TOKENS_KEY, tokens);
  }
  return email;
}

export function createResetToken(email: string): string {
  const tokens = readJSON<TokensMap>(RESET_TOKENS_KEY, {});
  const token = genToken();
  tokens[token] = email;
  writeJSON(RESET_TOKENS_KEY, tokens);
  return token;
}

export function consumeResetToken(token: string): string | null {
  const tokens = readJSON<TokensMap>(RESET_TOKENS_KEY, {});
  const email = tokens[token] || null;
  if (email) {
    delete tokens[token];
    writeJSON(RESET_TOKENS_KEY, tokens);
  }
  return email;
}
