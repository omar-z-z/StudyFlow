interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div
      className="bg-card rounded-xl px-8 py-8 w-full"
      style={{ border: "2px solid var(--border)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
    >
      {children}
    </div>
  );
}