import BigTextArea from "@/components/text-areas/bigTextArea";

export default function TestPage() {
  // return <p>Em teste</p>;

  const mockFunction = async () => {
    "use server";
  };

  return <BigTextArea updateFuncion={mockFunction} state={"teste"} />;
}
