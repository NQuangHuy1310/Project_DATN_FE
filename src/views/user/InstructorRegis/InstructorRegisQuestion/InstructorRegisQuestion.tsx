import { useState, useEffect } from 'react'

import { FaPlus } from 'react-icons/fa'
import { MdOutlineDriveFolderUpload } from 'react-icons/md'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { questions } from '@/constants/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterTeacher } from '@/app/hooks/accounts/useRegisterTeacher'
import { registerInstructor, registerInstructorSchema } from '@/validations/registerInstructor'

const FILE_UPLOAD_MAX_SIZE = 10 * 1024 * 1024

const InstructorRegisQuestion = () => {
    const [step, setStep] = useState<number>(1)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [selectedOptions, setSelectedOptions] = useState<number[]>([])
    const [isAnswered, setIsAnswered] = useState<boolean>(false)

    const { mutateAsync: registerTeacher } = useRegisterTeacher()

    const {
        control,
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm<registerInstructor>({
        resolver: zodResolver(registerInstructorSchema),
        defaultValues: {
            certificates: [{ file: null }]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'certificates'
    })

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

    const handleNext = () => {
        if (step === 1) {
            if (currentQuestion < questions.length - 1) {
                const nextQuestion = currentQuestion + 1
                setCurrentQuestion(nextQuestion)
                setIsAnswered(selectedOptions[nextQuestion] !== undefined)
                localStorage.setItem('currentQuestion', nextQuestion.toString())
            } else {
                setStep(2)
            }
        }
    }

    const handlePrevious = () => {
        if (step === 1) {
            if (currentQuestion > 0) {
                const prevQuestion = currentQuestion - 1
                setCurrentQuestion(prevQuestion)
                setIsAnswered(selectedOptions[prevQuestion] !== undefined)
                localStorage.setItem('currentQuestion', prevQuestion.toString())
            }
        } else if (step === 2) {
            setStep(1)
        }
    }

    const handleFileChange = (index: number, file: File | null) => {
        if (file && file.size > FILE_UPLOAD_MAX_SIZE) {
            toast.error('File tải lên quá lớn. Vui lòng chọn file nhỏ hơn 10 MB.')
            return
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']

        if (file && !allowedTypes.includes(file.type)) {
            toast.error('Vui lòng chọn file JPG, PNG hoặc PDF.')
            return
        }
        setValue(`certificates.${index}.file`, file)
    }

    const handlePreview = (file: File | null) => {
        if (!file) {
            toast.error('Không có tệp nào để xem trước.')
            return
        }
        const fileURL = URL.createObjectURL(file)
        window.open(fileURL, '_blank')
    }

    const onSubmit: SubmitHandler<registerInstructor> = async (data) => {
        const { certificates, degree, institution_name, start_date } = data

        if (certificates.length === 0 || !certificates[0].file) {
            toast.error('Vui lòng tải lên ít nhất một chứng chỉ.')
            return
        }

        const formattedQaPairs = questions.reduce(
            (acc, question, index) => {
                if (selectedOptions[index] !== undefined) {
                    acc.push({
                        question: question.question,
                        answer: question.options[selectedOptions[index]]
                    })
                }
                return acc
            },
            [] as { question: string; answer: string }[]
        )

        const payload = {
            certificates: certificates.map((cert) => cert.file?.name || ''),
            qa_pairs: formattedQaPairs,
            degree,
            institution_name,
            start_date
        }
        await registerTeacher(payload)
    }

    return (
        <>
            {step === 1 && (
                <div>
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
                                        selectedOptions[index] !== undefined
                                            ? 'bg-primary/40 text-white'
                                            : 'text-gray-500'
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
                            <p>{questions[currentQuestion].description}</p>
                            <p className="text-base font-semibold">{questions[currentQuestion].question}</p>
                        </div>

                        <div className="mb-6">
                            {questions[currentQuestion].options.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    className={`mb-2 block w-full cursor-pointer rounded-md border border-gray-300 p-3 text-left ${
                                        selectedOptions[currentQuestion] === index
                                            ? 'bg-primary/70 text-white'
                                            : 'bg-white'
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
                                className="rounded px-4 py-2 font-semibold text-white"
                            >
                                {currentQuestion < questions.length - 1 ? 'Tiếp tục' : 'Upload chứng chỉ'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl">
                    <div>
                        <h2 className="py-2 text-xl font-bold">Thông tin của bạn</h2>
                        <span>
                            Vui lòng cung cấp thông tin học vấn của bạn để chúng tôi có thể xác nhận và giúp bạn trở
                            thành người hướng dẫn. Chúng tôi sẽ xem xét hồ sơ của bạn và phản hồi trong thời gian sớm
                            nhất. Cảm ơn bạn đã hợp tác!
                        </span>
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                        <label className="text-base font-medium">
                            Bằng cấp <span className="text-secondaryRed">*</span>
                        </label>
                        <Input
                            {...register('degree')}
                            placeholder="Vui lòng nhập tên bằng cấp bạn đã đạt được. (VD: Cử nhân, Thạc sĩ, Tiến sĩ...)"
                        />
                        {errors.degree && <p className="text-secondaryRed">{errors.degree.message}</p>}
                    </div>

                    <div className="mt-3 flex flex-col gap-2">
                        <label className="text-base font-medium">
                            Tên trường <span className="text-secondaryRed">*</span>
                        </label>
                        <Input
                            {...register('institution_name')}
                            placeholder="Hãy nhập tên trường đại học hoặc cơ sở giáo dục nơi bạn đã nhận bằng cấp."
                        />
                        {errors.institution_name && (
                            <p className="text-secondaryRed">{errors.institution_name.message}</p>
                        )}
                    </div>

                    <div className="mt-3 flex flex-col gap-2">
                        <label className="text-base font-medium">
                            Năm hoàn thành <span className="text-secondaryRed">*</span>
                        </label>
                        <Input
                            type="date"
                            placeholder="Đừng quên ghi lại năm bạn đã hoàn thành chương trình học."
                            {...register('start_date')}
                        />
                        {errors.start_date && <p className="text-secondaryRed">{errors.start_date.message}</p>}
                    </div>
                    <label className="block py-3 text-base font-medium">
                        Tải lên chứng chỉ <span className="text-secondaryRed">*</span>
                    </label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="mb-6 w-full">
                            <div className="flex gap-2">
                                <div
                                    className="flex h-[86px] w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed py-4"
                                    onClick={() => document.getElementById(`file-input-${index}`)?.click()}
                                >
                                    <input
                                        id={`file-input-${index}`}
                                        type="file"
                                        hidden
                                        onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                                    />
                                    <MdOutlineDriveFolderUpload className="size-8 text-primary" />
                                    <h6 className="text-base font-semibold">Tải lên file</h6>
                                    {watch(`certificates.${index}.file`) && (
                                        <p className="text-sm">
                                            Tên file: {(watch(`certificates.${index}.file`) as File).name}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    {watch(`certificates.${index}.file`) && (
                                        <Button
                                            type="button"
                                            onClick={() => handlePreview(watch(`certificates.${index}.file`))}
                                            className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                                        >
                                            Xem trước
                                        </Button>
                                    )}

                                    {fields.length > 1 && (
                                        <Button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="rounded bg-secondaryRed px-[39px] py-2 font-semibold text-white hover:bg-red-600"
                                        >
                                            Xóa
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center justify-between">
                        <Button
                            type="button"
                            onClick={() => append({ file: null })}
                            className="flex items-center gap-2 rounded bg-secondaryGreen px-4 py-2 font-semibold text-white hover:bg-secondaryGreen/80"
                        >
                            <FaPlus className="size-3" />
                            Thêm chứng chỉ mới
                        </Button>

                        <Button
                            type="submit"
                            className="rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90"
                        >
                            Gửi đăng ký
                        </Button>
                    </div>
                </form>
            )}
        </>
    )
}

export default InstructorRegisQuestion
