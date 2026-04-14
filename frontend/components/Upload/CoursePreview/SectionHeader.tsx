interface SectionHeaderProps {
  title: string;
  count: number;
}

const SectionHeader = ({ title, count }: SectionHeaderProps) => (
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-sm font-medium text-foreground">{title}</h3>
    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
      {count}
    </span>
  </div>
);

export default SectionHeader;