import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "./button";
import { Input } from "./input";

type Field = {
  name: string;
  placeholder: string;
  type: string;
};
type ChildProp = {
  fields: Field[];
  buttonText: string;
  onSubmit: (data: Record<string, string>, dispatch: any) => void;
};
type ChildPropTwo = {
  name: string;
  placeholder: string;
  type: string;
};

export function Form({ fields, onSubmit, buttonText }: ChildProp) {
  const { dispatch } = useAuth();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData, dispatch);
  };

  return (
    <div className="flex flex-col gap-5  items-center">
      {fields.map(({ name, placeholder, type }: ChildPropTwo) => (
        <Input
          key={name}
          type={type}
          placeholder={placeholder}
          value={formData[name] || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, name)
          }
        />
      ))}
      <Button onClick={handleSubmit} text={buttonText} />
    </div>
  );
}
