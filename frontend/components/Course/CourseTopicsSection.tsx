import { Topic } from "@/types/topic";
import TopicItem from "@/components/Courses/TopicItem";

type Props = {
  topics: Topic[];
  onToggle: (topicId: string) => void;
};

const CourseTopicsSection = ({ topics, onToggle }: Props) => (
  <div className="bg-card border border-border rounded-xl p-5">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
        Topics
      </h2>
      <span className="text-xs text-muted-foreground">
        {topics.filter((t) => t.completed).length}/{topics.length}
      </span>
    </div>

    {topics.length === 0 ? (
      <p className="text-xs text-muted-foreground py-1">No topics added yet.</p>
    ) : (
      <div className="flex flex-col">
        {topics.map((topic) => (
          <TopicItem
            key={topic.id}
            topic={topic}
            onToggle={() => onToggle(topic.id)}
          />
        ))}
      </div>
    )}
  </div>
);

export default CourseTopicsSection;