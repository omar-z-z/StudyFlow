import RemoveButton from "@/components/basicComponents/RemoveButton";
import AddRowButton from "@/components/basicComponents/AddRowButton";
import { TopicDraft } from "@/types/modal";

type TopicsStepProps = {
  topics: TopicDraft[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Omit<TopicDraft, "id">, value: string) => void;
  onRemove: (id: string) => void;
};

const TopicsStep = ({ topics, onAdd, onUpdate, onRemove }: TopicsStepProps) => (
  <div className="flex flex-col gap-3">
    {topics.map((topic, index) => (
      <div key={topic.id} className="flex items-center gap-2">
        {/* Week */}
        <div className="flex flex-col gap-1">
          <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground">
            Wk
          </span>
          <input
            type="number"
            min={1}
            value={topic.week}
            onChange={(e) => onUpdate(topic.id, "week", e.target.value)}
            aria-label={`Week for topic ${index + 1}`}
            className="w-14 px-2 py-2 bg-background text-sm text-foreground rounded-(--radius) border border-border outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 text-center"
          />
        </div>

        {/* Title */}
        <div className="flex-1 flex flex-col gap-1">
          <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground">
            Topic Title
          </span>
          <input
            type="text"
            value={topic.title}
            onChange={(e) => onUpdate(topic.id, "title", e.target.value)}
            placeholder="e.g. Big O Notation"
            aria-label={`Title for topic ${index + 1}`}
            className="w-full px-3 py-2 bg-background text-sm text-foreground rounded-(--radius) border border-border outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="mt-5">
          <RemoveButton onClick={() => onRemove(topic.id)} />
        </div>
      </div>
    ))}
    <AddRowButton label="Add Topic" onClick={onAdd} />
  </div>
);

export default TopicsStep;