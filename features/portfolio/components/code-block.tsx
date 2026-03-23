import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  language?: string;
};

type HighlightToken = {
  value: string;
  tone?: string;
};

const languageDisplayNames: Record<string, string> = {
  bash: "Terminal",
  dockerfile: "Dockerfile",
  json: "JSON",
  php: "PHP",
  sh: "Shell",
  yaml: "YAML",
  yml: "YAML",
};

function codePattern(language?: string) {
  switch ((language ?? "").toLowerCase()) {
    case "php":
      return /\/\*[\s\S]*?\*\/|\/\/.*|#.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\$[A-Za-z_]\w*|\b(?:namespace|use|class|interface|trait|extends|implements|public|private|protected|function|return|new|if|else|elseif|foreach|for|while|switch|case|break|continue|try|catch|finally|throw|const|static|null|true|false|array|int|string|bool|float|void|self|parent)\b|\b\d+(?:\.\d+)?\b/g;
    case "yaml":
    case "yml":
      return /#.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[A-Za-z0-9_.-]+(?=:)|\b(?:true|false|null)\b|\b\d+(?:\.\d+)?\b/g;
    case "json":
      return /"(?:\\.|[^"\\])*"(?=\s*:)|"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?\b/g;
    case "dockerfile":
      return /#.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\$\{?[A-Za-z_][\w]*\}?|\b(?:FROM|RUN|COPY|CMD|ENTRYPOINT|WORKDIR|EXPOSE|ENV|ARG|USER|SHELL|LABEL|ADD|VOLUME|STOPSIGNAL|HEALTHCHECK|ONBUILD|AS)\b|\b\d+(?:\.\d+)?\b/g;
    case "bash":
    case "sh":
      return /#.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\$\{?[A-Za-z_][\w]*\}?|\b(?:if|then|else|fi|for|in|do|done|case|esac|export|function|local|alias|source|docker|compose|git|cd|npm|bun|php)\b|\b\d+(?:\.\d+)?\b/g;
    default:
      return /\/\*[\s\S]*?\*\/|\/\/.*|#.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b/g;
  }
}

function classifyToken(token: string, language?: string) {
  const normalizedLanguage = (language ?? "").toLowerCase();

  if (
    token.startsWith("//") ||
    token.startsWith("#") ||
    token.startsWith("/*")
  ) {
    return "text-slate-500";
  }

  if (token.startsWith('"') || token.startsWith("'")) {
    return normalizedLanguage === "json" && token.endsWith('"')
      ? "text-cyan-300"
      : "text-emerald-300";
  }

  if (token.startsWith("$")) {
    return "text-sky-300";
  }

  if (/^\d/.test(token) || /^-\d/.test(token)) {
    return "text-amber-300";
  }

  if (normalizedLanguage === "yaml" || normalizedLanguage === "yml") {
    if (/^[A-Za-z0-9_.-]+$/.test(token)) {
      return "text-cyan-300";
    }
  }

  if (
    /^(namespace|use|class|interface|trait|extends|implements|public|private|protected|function|return|new|if|else|elseif|foreach|for|while|switch|case|break|continue|try|catch|finally|throw|const|static|null|true|false|array|int|string|bool|float|void|self|parent|FROM|RUN|COPY|CMD|ENTRYPOINT|WORKDIR|EXPOSE|ENV|ARG|USER|SHELL|LABEL|ADD|VOLUME|STOPSIGNAL|HEALTHCHECK|ONBUILD|AS|then|fi|do|done|in|export|local|alias|source)$/.test(
      token,
    )
  ) {
    return "text-rose-300";
  }

  if (/^(docker|compose|git|cd|npm|bun|php)$/.test(token)) {
    return "text-violet-300";
  }

  if (/^(true|false|null)$/.test(token)) {
    return "text-rose-300";
  }

  return "text-slate-100";
}

function highlightLine(line: string, language?: string): HighlightToken[] {
  const pattern = codePattern(language);
  const tokens: HighlightToken[] = [];
  let lastIndex = 0;

  for (const match of line.matchAll(pattern)) {
    const value = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      tokens.push({ value: line.slice(lastIndex, index) });
    }

    tokens.push({
      value,
      tone: classifyToken(value, language),
    });

    lastIndex = index + value.length;
  }

  if (lastIndex < line.length) {
    tokens.push({ value: line.slice(lastIndex) });
  }

  return tokens.length > 0 ? tokens : [{ value: line }];
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const lines = code.split("\n");
  const languageLabel = languageDisplayNames[(language ?? "").toLowerCase()] ?? "Code";

  return (
    <div className="mb-6 overflow-hidden rounded-[1.2rem] border border-[#3a404c] bg-[#272c33] shadow-[0_14px_36px_rgba(15,22,36,0.18)]">
      <div className="flex items-center justify-between border-b border-white/6 bg-[#2d333b] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b7a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f5b74f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#57d285]" />
        </div>

        <span className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-slate-400">
          {languageLabel}
        </span>
      </div>

      <pre className="overflow-x-auto px-5 py-5 text-[0.95rem] leading-[1.9] text-slate-100">
        <code>
          {lines.map((line, lineIndex) => (
            <span key={`${line}-${lineIndex}`} className="block min-w-max">
              {highlightLine(line, language).map((token, tokenIndex) => (
                <span
                  key={`${token.value}-${tokenIndex}`}
                  className={cn(token.tone)}
                >
                  {token.value}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
