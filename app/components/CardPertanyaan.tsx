type CardPertanyaanProps = {
  question: string;
  onAnswer: (answer: "yes" | "no") => void;
};

export default function CardPertanyaan({
  question,
  onAnswer,
}: CardPertanyaanProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
      <p className="text-lg font-medium mb-4">{question}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onAnswer("yes")}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Ya
        </button>
        <button
          onClick={() => onAnswer("no")}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Tidak
        </button>
      </div>
    </div>
  );
}
