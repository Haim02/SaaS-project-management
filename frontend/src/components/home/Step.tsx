
type StepProps = {
  number: string;
  title: string;
  text: string;
};

const Step = ({ number, title, text }: StepProps) => {
  
  return (
    <div className="bg-white rounded-2xl border p-5">
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white grid place-items-center font-bold">
        {number}
      </div>
      <h4 className="mt-3 font-semibold text-gray-900">{title}</h4>
      <p className="mt-1 text-gray-600 text-sm">{text}</p>
    </div>
  );
}

export default Step
