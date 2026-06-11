import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface FormValues {
  username: string;
  email: string;
  numbers: number[];
}

const App = () => {

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
      };
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('onSubmit', data );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        {/* SUBMIT BUTTON */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

      </form>
      <DevTool control={control} />
    </>
  );
};

export default App;
