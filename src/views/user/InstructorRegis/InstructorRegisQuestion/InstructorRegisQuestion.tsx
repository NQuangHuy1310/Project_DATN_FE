import { toast } from 'sonner'
import { useRegisterTeacher } from '@/app/hooks/accounts/useRegisterTeacher'
import { Button } from '@/components/ui/button'
import { questions } from '@/constants/constants'
import { useState, useEffect } from 'react'

const InstructorRegisQuestion = () => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [selectedOptions, setSelectedOptions] = useState<number[]>([])
    const [isAnswered, setIsAnswered] = useState<boolean>(false)

    const { mutateAsync: registerTeacher } = useRegisterTeacher()

    useEffect(() => {
        const savedAnswers = localStorage.getItem('selectedOptions')
        if (savedAnswers) {
            const parsedAnswers = JSON.parse(savedAnswers)
            setSelectedOptions(parsedAnswers)
            setIsAnswered(parsedAnswers[currentQuestion] !== undefined)
        }
        const savedQuestionIndex = localStorage.getItem('currentQuestion')
        if (savedQuestionIndex) {
            setCurrentQuestion(parseInt(savedQuestionIndex, 10))
        }
    }, [])

    useEffect(() => {
        setIsAnswered(selectedOptions[currentQuestion] !== undefined)
    }, [currentQuestion, selectedOptions])

    const handleOptionClick = (index: number) => {
        const updatedOptions = [...selectedOptions]
        updatedOptions[currentQuestion] = index
        setSelectedOptions(updatedOptions)
        setIsAnswered(true)
        localStorage.setItem('selectedOptions', JSON.stringify(updatedOptions))
    }

    const handleNext = async () => {
        if (currentQuestion < questions.length - 1) {
            const nextQuestion = currentQuestion + 1
            setCurrentQuestion(nextQuestion)
            setIsAnswered(selectedOptions[nextQuestion] !== undefined)
            localStorage.setItem('currentQuestion', nextQuestion.toString())
        } else {
            await registerTeacher()
            toast.success('Chúc mừng bạn đăng ký thành công')
        }
    }

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            const prevQuestion = currentQuestion - 1
            setCurrentQuestion(prevQuestion)
            setIsAnswered(selectedOptions[prevQuestion] !== undefined)
            localStorage.setItem('currentQuestion', prevQuestion.toString())
        }
    }

    return (
        <>
            <div className="mb-4 mt-6 flex w-full justify-between">
                {questions.map((_, index) => (
                    <div
                        key={index}
                        className={`h-[3px] flex-1 rounded-full ${
                            selectedOptions[index] !== undefined ? 'bg-primary' : 'bg-gray-300'
                        } relative`}
                    >
                        <span
                            className={`absolute -top-8 left-1/2 h-7 w-7 -translate-x-1/2 transform rounded-full text-center leading-7 ${
                                selectedOptions[index] !== undefined ? 'bg-primary/40 text-white' : 'text-gray-500'
                            }`}
                        >
                            {index + 1}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mx-auto max-w-2xl">
                <div className="mb-4 flex flex-col gap-2">
                    <h3 className="text-xl font-bold">{questions[currentQuestion].title}</h3>
                    <p className="">{questions[currentQuestion].description}</p>
                    <p className="text-base font-semibold">{questions[currentQuestion].question}</p>
                </div>

                <div className="mb-6">
                    {questions[currentQuestion].options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(index)}
                            className={`mb-2 block w-full cursor-pointer rounded-md border border-gray-300 p-3 text-left ${
                                selectedOptions[currentQuestion] === index ? 'bg-primary/70 text-white' : 'bg-white'
                            }`}
                        >
                            {option}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between">
                    <Button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className={`${
                            currentQuestion === 0 ? 'bg-gray-300' : 'bg-gray-500 hover:bg-gray-600'
                        } rounded px-4 py-2 font-semibold text-white`}
                    >
                        Quay lại
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={!isAnswered}
                        className={`rounded px-4 py-2 font-semibold text-white`}
                    >
                        {currentQuestion < questions.length - 1 ? 'Tiếp tục' : 'Xác nhận đăng ký'}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default InstructorRegisQuestion
