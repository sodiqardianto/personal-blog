import type { PostBlock, TextRun } from "@/features/portfolio/types";
import { CodeBlock } from "@/features/portfolio/components/code-block";

function parseInlineText(value: string): TextRun[] {
  const runs: TextRun[] = [];
  const tokenPattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;

  for (const match of value.matchAll(tokenPattern)) {
    const token = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      runs.push({ type: "text", value: value.slice(lastIndex, index) });
    }

    if (token.startsWith("`")) {
      runs.push({ type: "code", value: token.slice(1, -1) });
    } else if (token.startsWith("**")) {
      runs.push({ type: "strong", value: token.slice(2, -2) });
    } else {
      runs.push({ type: "emphasis", value: token.slice(1, -1) });
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < value.length) {
    runs.push({ type: "text", value: value.slice(lastIndex) });
  }

  return runs.length > 0 ? runs : [{ type: "text", value }];
}

function InlineContent({ content }: { content: TextRun[] }) {
  return (
    <>
      {content.map((item, index) => {
        const key = `${item.value}-${index}`;

        if (item.type === "code") {
          return (
            <code
              key={key}
              className="rounded bg-blue/7 px-1.5 py-0.5 font-mono text-[0.875em] text-blue dark:bg-blue-dark/10 dark:text-blue-dark"
            >
              {item.value}
            </code>
          );
        }

        if (item.type === "strong") {
          return <strong key={key}>{item.value}</strong>;
        }

        if (item.type === "emphasis") {
          return <em key={key}>{item.value}</em>;
        }

        return <span key={key}>{item.value}</span>;
      })}
    </>
  );
}

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h3
              key={`${block.value}-${index}`}
              className="mb-4 mt-10 font-serif text-[1.65rem] tracking-tight text-ink dark:text-slate-100"
            >
              <InlineContent content={parseInlineText(block.value)} />
            </h3>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={`${block.value}-${index}`}
              className="my-7 border-l-[3px] border-blue py-1 pl-6 font-serif text-[1.18rem] italic text-ink/50 dark:border-blue-dark dark:text-slate-500"
            >
              <InlineContent content={parseInlineText(block.value)} />
            </blockquote>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`${block.items.join("-")}-${index}`}
              className="mb-6 list-disc space-y-1.5 pl-6"
            >
              {block.items.map((item) => (
                <li
                  key={item}
                  className="leading-relaxed text-ink/55 dark:text-slate-400"
                >
                  <InlineContent content={parseInlineText(item)} />
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "codeBlock") {
          return (
            <CodeBlock
              key={`${block.language ?? "plain"}-${index}`}
              code={block.value}
              language={block.language}
            />
          );
        }

        return (
          <p
            key={`${index}-${block.content.length}`}
            className="mb-6 text-[1.04rem] leading-[1.82] text-ink/60 dark:text-slate-400"
          >
            <InlineContent content={block.content} />
          </p>
        );
      })}
    </div>
  );
}
