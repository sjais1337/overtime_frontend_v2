export default function Loading() {
  return (
    (<div className="flex min-h-[100dvh] items-center justify-center bg-background">
      <div className="space-y-4 text-center">
        <div className="animate-spin-slow">
          <div className="h-12 w-12 text-primary" />
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>)
  );
}
