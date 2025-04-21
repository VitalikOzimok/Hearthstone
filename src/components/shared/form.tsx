import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "./button";
import { Input } from "./input";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/route";
import { KEY_ENTER } from "../navbar/constants";

type Field = {
  name: string;
  placeholder: string;
  type: string;
};
type ChildProp = {
  fields: Field[];
  buttonText: string;
  onSubmit: (data: Record<string, string>, dispatch: any) => Promise<boolean>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export function Form({ fields, onSubmit, buttonText, setError }: ChildProp) {
  const { dispatch } = useAuth();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFormData({ ...formData, [name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async () => {
    const isEmpty = fields.some((field) => !formData[field.name]?.trim());

    if (isEmpty) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }
    const success = await onSubmit(formData, dispatch);
    if (success) {
      navigate(ROUTES.collection);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === KEY_ENTER) {
      handleSubmit();
    }
  };
  return (
    <div
      className="flex flex-col gap-5  items-center"
      onKeyDown={handleKeyDown}
    >
      {fields.map(({ name, placeholder, type }: Field) => (
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
