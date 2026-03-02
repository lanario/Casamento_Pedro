/**
 * Página do convite: envelope fechado que, ao abrir, revela o conteúdo no formato do template.
 */
import { LetterEnvelope } from "@/components/LetterEnvelope";
import { InviteTemplateContent } from "@/components/InviteTemplateContent";

export default function HomePage() {
  return (
    <div className="min-h-screen min-w-0">
      <LetterEnvelope isOpen={false}>
        <InviteTemplateContent />
      </LetterEnvelope>
    </div>
  );
}
