export interface comboboxProps {
  label1?: string;
  label2?: string;
}

const Combobox = ({ label1 = "Enter", label2 = "Exit" }: comboboxProps) => {
  return (
    <>
      <div>
        <h3>Hellow from react</h3>
        <span>
          <button>{label1}</button>
          <button>{label2}</button>
        </span>
      </div>
    </>
  );
};

export default Combobox;
