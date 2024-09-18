import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../Modal";
import Button from "../Button";
import Heading from "../common/Heading";
import Markdown from "react-markdown";
import { useAuth } from "../context/auth";

// Typage des données retournées par l'API
interface GeneratedResponse {
  biography: string;
  generatedPrompt: string;
}

// Composant principal pour générer une biographie
const BiographyGenerationModal: React.FC<{
  personId: number;
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
}> = ({ personId, modalOpen, setModalOpen }) => {
  const { user } = useAuth();
  const [temperature, setTemperature] = useState<number>(0.2);
  const [maxTokens, setMaxTokens] = useState<number>(2048);
  const [generatedText, setGeneratedText] = useState<string>("");
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fonction pour générer la biographie en appelant l'API OpenAI
  const generateBiography = async () => {
    setLoading(true);
    try {
      const openAIParams = {
        temperature,
        maxTokens,
      };

      const response = await fetch(
        `/people/${personId}/generate-biography?temperature=${temperature}&maxtokens=${maxTokens}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(openAIParams),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la génération de la biographie");
      }

      const data: GeneratedResponse = await response.json();
      setGeneratedText(data.biography);
      setGeneratedPrompt(data.generatedPrompt);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
      <Heading level="h2">Générateur de Biographie</Heading>

      <div className="flex gap-10 mb-4">
        <div>
          <label>
            Température:
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              step="0.1"
              min="0"
              max="1"
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>

        <div>
          <label>
            Max Tokens:
            <input
              type="number"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              style={{ marginLeft: "10px" }}
              min={10}
              max={2000}
            />
          </label>
        </div>
      </div>

      <Button onClick={generateBiography} disabled={loading}>
        {loading ? "Génération en cours..." : "Générer la biographie"}
      </Button>

      {generatedText && (
        <div style={{ marginTop: "20px" }}>
          <Heading level="h3">Biographie générée:</Heading>
          <article className="biography-article border p-4">
            <Markdown>{generatedText}</Markdown>
          </article>
        </div>
      )}

      {generatedPrompt && (
        <div style={{ marginTop: "20px" }}>
          <Heading level="h3">Prompt généré par l'API:</Heading>
          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              whiteSpace: "pre-wrap", // pour appliquer le wrapping
              wordWrap: "break-word", // pour éviter le scroll horizontal
              overflowWrap: "break-word", // pour gérer les longs mots
            }}
          >
            {generatedPrompt}
          </pre>
        </div>
      )}
    </Modal>
  );
};

export default BiographyGenerationModal;
