import React, { useState } from 'react';
import { Eye, EyeOff, X, CheckCircle, Info } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { NavLink } from 'react-router-dom';
import { BgAbout, Logo } from '../assets/img/index';
import { motion } from 'framer-motion';
import Step from './Step';
import Stepper from './Stepper';
import RegistrationButton from './RegistrationButton';



export default function SignUp() {
 const dataLogin = {title: "Login", messageLoading:"Signing in..."};
 const dataRegister = {title: "Register", messageLoading:"Registring..."};


  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: 'example@mail.com',
    password: '••••••••',
    fullName: '',
    phoneNumber: ''
  });
  const [agreeToPromotions, setAgreeToPromotions] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSwipeUp = () => {
    setIsLogin(!isLogin);
  };

  const handleStepChange = (step) => {
    console.log(`Current step: ${step}`);
  };

  const handleFinalStepCompleted = () => {
    console.log("Registration completed!");
    setIsCompleted(true);
  };

  

  // Fonction pour soumettre les données à la base de données
  const handleRegistration = async () => {
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API
      console.log('Submitting registration data:', formData);
      
      // Simuler une requête HTTP
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ici vous pourriez faire un vrai appel API :
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: formData.fullName,
      //     email: formData.email,
      //     password: formData.password,
      //     phoneNumber: formData.phoneNumber,
      //     agreeToPromotions: agreeToPromotions
      //   })
      // });
      // 
      // if (response.ok) {
      //   setIsCompleted(true);
      // } else {
      //   throw new Error('Registration failed');
      // }
      
      // Pour la démonstration, on simule le succès
      setIsCompleted(true);
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal || isCompleted) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-red-100 via-red-400 to-red-200 relative">      
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="bg-gradient-to-br from-red-100 to-red-100 rounded-2xl p-8 mb-6">
              <div className="relative">
                <div className="inline-block relative">
                  <div className="w-16 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-lg relative transform -rotate-12">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="absolute -top-2 -left-1 w-6 h-2 bg-gradient-to-br from-red-400 to-red-500 rounded-full"></div>
                    <div className="absolute -top-2 -right-1 w-6 h-2 bg-gradient-to-br from-red-400 to-red-500 rounded-full"></div>
                  </div>
                  <div className="inline-block ml-4 w-16 h-12 bg-gradient-to-br from-red-700 to-red-800 rounded-lg relative transform rotate-12">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-sm">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-red-500 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-red-800 mb-4">You are successfully registered!</h1>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-3 rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-300">
              Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative">
    {/* Image Background */}    
    <img src={BgAbout} alt='background' className='w-full h-full object-cover absolute inset-0'/>
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-400  rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 1.25, delay: 0.8 }} 
      className="relative z-10 min-h-screen w-full flex items-center justify-center p-8 sm:p-14 lg:p-20">
        {/* Logo and Title */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-center">
          <div className="flex items-center justify-center">
          <img src={Logo} alt='background' className='w-28 h-28 inset-0'/>
          </div>
        </div>

        {/* Modal */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-red-200/20">
          {/* Close Button */}
          <NavLink to={'/'}>
          <button 
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
          </NavLink>
          {/* Stepper */}
          <Stepper
            initialStep={1}
            onStepChange={handleStepChange}
            onFinalStepCompleted={handleFinalStepCompleted}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            {/* Step 1: Login/Register */}
            <Step>
              <div className="space-y-6">
                {/* Tabs */}
                <div className="flex mb-8 border-b border-gray-200">
                  <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 px-4 font-semibold transition-colors ${
                      !isLogin 
                        ? 'text-[#e4452c] border-b-2 border-[#e4452c]' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Register
                  </button>
                  <button 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 px-4 font-semibold transition-colors ${
                      isLogin 
                        ? 'text-[#e4452c] border-b-2 border-[#e4452c]' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Log In
                  </button>
                </div>

                {/* Register Form */}
                {!isLogin && (
                  <>
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                          placeholder="Name"
                        />
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                      </div>
                    </div>
                  </>
                )}

                {/* Login Form */}
                {isLogin && (
                  <>
                    {/* Email Field for Login */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                          placeholder="example@gmail.com"
                        />
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                      </div>
                    </div>

                    {/* Password Field for Login */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                          placeholder="••••••••"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                          <CheckCircle className="text-green-500" size={20} />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <RegistrationButton data={dataLogin} /> 

                    {/* Forgot Password */}
                    <div className="text-center">
                      <a href="#" className="text-sm text-red-400 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                  </>
                )}

                {/* Social Login */}
                <div className="text-center text-gray-500 text-sm mb-4">
                  or {isLogin ? 'login' : 'register'} with
                </div>

                <div className="flex justify-center space-x-5">
                  <button className="w-96 h-12 bg-white border rounded-md border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <FcGoogle />
                    <span className='ml-1 font-Kodchasan'>Google</span>
                  </button>
                </div>

                {/* Terms */}
                <div className="text-center text-xs text-gray-500">
                  By continuing I agree with the{' '}
                  <a href="#" className="text-red-500 hover:underline">
                    Terms & Conditions
                  </a>
                  ,{' '}
                  <a href="#" className="text-red-500 hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </Step>

            {/* Step 2: Personal Information */}
            <Step>
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Personal information</h2>
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Step 2 of 3</span>
                </div>

                {/* Privacy Notice */}
                <div className="flex items-start space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Info size={16} className="mt-0.5 flex-shrink-0" />
                  <span>The phone number are only visible to you</span>
                </div>

                {/* Phone Number with Country Code */}
                <div className="flex space-x-2">
                  <div className="w-20">
                    <select className="w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200">
                      <option>+598</option>
                      <option>+212</option>
                      <option>+33</option>
                      <option>+44</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>
            </Step>

            {/* Step 3: Email & Password */}
            <Step>
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Add Email</h2>
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Step 3 of 3</span>
                </div>
                
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="example@gmail.com"
                    />
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <CheckCircle className="text-green-500" size={20} />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">8+ characters</p>
                </div>

                {/* Promotions Checkbox */}
                {!isLogin && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="promotions"
                      checked={agreeToPromotions}
                      onChange={(e) => setAgreeToPromotions(e.target.checked)}
                      className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label htmlFor="promotions" className="text-sm text-gray-600">
                      Send me news and promotions
                    </label>
                  </div>
                )}

                {/* Register Button */}
                <div className="mt-8">
                  <button
                    onClick={handleRegistration}
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                      isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-red-500 to-[#e4452c] hover:from-red-600 hover:to-red-700 transform hover:scale-105'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
              </div>
            </Step>
          </Stepper>
        </div>
      </motion.div>
    </div>
  );
}