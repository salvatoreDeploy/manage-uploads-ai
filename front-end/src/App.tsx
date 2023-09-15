import { FileVideo, Github, Upload, Wand2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";

export function App() {
  return (
    <div className=" min-h-screen flex flex-col">
      {/*  Header */}
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">Manage.Upload</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido para melhorar sua experiencia
          </span>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="flex flex-1 p-6  gap-6">
        <div className="flex flex-col flex-1 gap-4 ">
          <div className="grid grid-rows-2 gap-4 flex-1 ">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Digite o prompt para IA..."
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              readOnly
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variavel transcription no seu prompt
            para adicioar o conteudo da{" "}
            <code className="text-violet-400">{"{transcription}"}</code> do
            video selecionado.
          </p>
        </div>
        <aside className="w-80 space-y-6">
          <VideoInputForm />

          <Separator />

          <form className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Titulo do YouTube</SelectItem>
                  <SelectItem value="description">
                    Descrição do YouTube
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                Você podera customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Temperatura de Criatividade</Label>

              <Slider min={0} max={1} step={0.1} />

              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo e
                com possiveis erros.
              </span>
            </div>

            <Separator />

            <Button type="submit" className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
