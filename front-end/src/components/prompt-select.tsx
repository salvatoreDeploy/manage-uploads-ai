import { api } from "@/lib/api";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Prompt {
  id: string;
  title: string;
  template: string;
}

interface PromptProps {
  onPromptSelected: (template: string) => void;
}

export function PromptSelect(props: PromptProps) {
  const [prompts, setPrompt] = useState<Prompt[] | null>(null);

  useEffect(() => {
    api.get("/prompt").then((response) => {
      setPrompt(response.data);
    });
  }, []);

  /* Repassar para propriedade o prompt pelo ID */

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId);

    if (!selectedPrompt) {
      return;
    }

    props.onPromptSelected(selectedPrompt.template);
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
