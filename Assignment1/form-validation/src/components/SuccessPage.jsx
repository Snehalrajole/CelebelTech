import { useLocation } from "react-router-dom";

export default function SuccessPage() {
  const { state } = useLocation();

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Submission Successful</h2>
      <ul className="list-disc ml-6">
        {Object.entries(state || {}).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
    </div>
  );
}
