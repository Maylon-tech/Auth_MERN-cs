import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
const isLoading = false


const EmailVerificationPage = () => {
    const [code, setCode] = useState("", "", "", "", "", "")
    const inputRefs = useRef([])
    const naviate = useNavigate()

    const handleChange = (index, value) => {
        
    }

    const handleKeyDown = (Index, e) => {

    }

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
    >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">Enter the 6-digit code sent to  your email address.</p>
        
        <form className="space-y-6">
            <div className="flex justify-between">
                {
                    code.map((digit, index) => (
                        <input
                            type="text"
                            key={index}
                            ref={(elem) => (inputRefs.current[index] = elem)}
                            maxLength='6'
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-2xl font-bold  bg-gray-700 text-white border-2 border-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
                        />
                    ))
                          
                }
            </div>
            <motion.button 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
            >
                
            </motion.button>
        </form>
    </motion.div>
    </div>
  )
}

export default EmailVerificationPage
