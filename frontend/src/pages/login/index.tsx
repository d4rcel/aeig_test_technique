import { useLoginUserMutation } from "@/features/auth/authApi";
import { LoginInput } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"


const Register = () => {
  const {
    register,
    // formState: { errors },
    handleSubmit,
    reset
  } = useForm<LoginInput>();

  // 👇 Calling the Register Mutation
  const [login, { isLoading, isSuccess, error, isError, data }] =
  useLoginUserMutation();

  const handleLoginForm = (user: LoginInput) => {
    login(user);
  };

  const navigate = useNavigate();


  useEffect(() => {
    if (isSuccess) {
      toast.dismiss("signup_user")
      toast.success(data?.message);
      reset()
      navigate('/dashboard');
    }

    if (isLoading) {
      toast.loading("Loading", { id: "signup_user" })
    }

    if (isError) {
      toast.dismiss("signup_user")
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
      }
    }
  }, [isLoading]);


  return (
    <div className="container mt80" style={{ margin: "auto" }}>
      <form className="form-style1" onSubmit={handleSubmit(handleLoginForm)}>

        <div className="mb25">
          <label htmlFor="email" className="form-label fw600 dark-color">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Entrez votre adresse mail"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>
        {/* End Email */}

        <div className="mb20">
          <label htmlFor="password" className="form-label fw600 dark-color">Mot de passe</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Entrer le mot de passe"
            {...register('password', { required: true })}
          />
        </div>
        {/* End Password */}


        <div className="d-grid mb20">
          <button className="ud-btn btn-thm" type="submit">
            Se connecter
          </button>
        </div>
        <div className="hr_content mb20">
          <hr />
          <span className="hr_top_text">OU</span>
        </div>

        <p className="dark-color text-center mb0 mt10">
          Vous avez déjà un compte?
          <Link className="dark-color fw600" to="/login">
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register