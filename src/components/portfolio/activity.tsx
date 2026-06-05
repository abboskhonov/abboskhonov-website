import { ActivityGraph } from "@/components/kibo-ui/contribution-graph/activity-graph";
import type { Activity as ActivityData } from "@/components/kibo-ui/contribution-graph";

interface ActivityProps {
  data: ActivityData[];
  error?: string | null;
}

export function Activity({ data, error }: ActivityProps) {
  return (
    <section className="mx-auto mb-20 max-w-prose">
      <h2 className="mb-8 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
        Activity
      </h2>
      <ActivityGraph data={data} error={error} />
    </section>
  );
}
