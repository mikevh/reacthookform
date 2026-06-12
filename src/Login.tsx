import { useForm, useFieldArray, type FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  email: string;
  numbers: number[];
  things: {
    name: string;
  }[]
}

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();

  const {
    formState: { errors, isSubmitting },
    control,
    register,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: async () : Promise<FormValues> => {
      // Simulate an asynchronous operation to fetch default values
      var response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1",
      );
      var data = await response.json();

      return {
        username: data.username,
        email: data.email,
        numbers: [100, 201],
        things: [
          { name: "Thing 1" }
        ]
      };
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "things",
  });

  const onSubmit = (data: FormValues) => {
    console.log('onSubmit', data );
    onLogin();
    navigate("/");
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log('onError', errors);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        {/* USERNAME */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        {/* EMAIL */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              validate: {
                isValidEmail: (value: string) => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return emailRegex.test(value) || "Invalid email address";
                },
                emailTaken: async (value: string) => {
                  // Simulate an asynchronous check for email availability
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  const takenEmails = ["a@b.com", "jane@example.com"];
                  return !takenEmails.includes(value) || "Email is already taken";
                }
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* NUMBER 0 */}
        <div>
          <label htmlFor="numbers.0">Number 1:</label>
          <input type="text" {...register("numbers.0")} />
        </div>

        {/* NUMBER 1 */}
        <div>
          <label htmlFor="numbers.1">Number 2:</label>
          <input type="text" {...register("numbers.1")} />
        </div>

        {/* THINGS */}
        <div>
          <label>Things:</label>
          {fields.map((field, index) => (
            <div key={field.id}>
              <label htmlFor={`things.${index}.name`}>Thing {index + 1}:</label>
              <input
                type="text"
                {...register(`things.${index}.name` as const)}
                defaultValue={field.name}
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={() => append({ name: '' })}>Add Thing</button>

        {/* SUBMIT BUTTON */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

      </form>
      <DevTool control={control} />
    </>
  );
};

export default Login;
