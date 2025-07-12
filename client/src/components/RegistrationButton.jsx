import { span } from "framer-motion/client";
import react from "react";
import { useState } from "react";

const RegistrationButton = ({ data }) => {

  const [formData, setFormData] = useState({
    email: 'example@mail.com',
    password: '••••••••',
    fullName: '',
    phoneNumber: ''
  });
    const [isLoading, setIsLoading] = useState(false);
     // Fonction pour gérer la connexion
    const handleLogin = async () => {
      setIsLoading(true);
    
     try {
      console.log('Attempting login with:', { email: formData.email, password: formData.password });
      
      // Simulation d'un appel API de login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Ici vous pourriez faire un vrai appel API de login :
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password
      //   })
      // });
      // 
      // if (response.ok) {
      //   const data = await response.json();
      //   localStorage.setItem('token', data.token);
      //   window.location.href = '/dashboard';
      // } else {
      //   throw new Error('Login failed');
      // }
      
      // Pour la démonstration, on simule une redirection
      alert('Login successful! Redirecting to dashboard...');
      // window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Email ou mot de passe incorrect. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };
   
    return (

        <div className="mt-6">
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#bd463d] to-[#ff6047] hover:from-[#ff6047] hover:to-[#bd463d] transform hover:scale-105'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {data.messageLoading}
            </div>
          ) : (
            <span>{data.title}</span>
          )}
        </button>
      </div>

    )
}
export default RegistrationButton;