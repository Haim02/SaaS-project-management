import { useState } from "react";
import { useCreateProjectMutation } from "../services/projectApi";
import Button from "./button/Button";

const CreateNewProject = () => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject({ name, description }).unwrap();
      setName("");
      setDescription("");
    } catch (error) {
      alert("שגיאה ביצירת פרויקט");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-6 bg-white shadow rounded-lg"
    >
      <h2 className="text-xl font-bold">צור פרויקט חדש</h2>
      <input
        type="text"
        placeholder="שם הפרויקט"
        className="w-full border rounded px-3 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="תיאור הפרויקט (אופציונלי)"
        className="w-full border rounded px-3 py-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button text="צור " type="submit" isLoading={isLoading} />
    </form>
  );
};

export default CreateNewProject;
