const MsgNoData = () => {
  return (
    <div
      className="rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 py-3 text-center">
        <h3 className="text-xl font-bold tracking-tight">
          Você não possui cadastros ainda! 😕
        </h3>
        <p className="text-sm text-muted-foreground">
          Cadastre os respectivos dados para uma experiência completa!
        </p>
      </div>
    </div>
  );
};

export default MsgNoData;
