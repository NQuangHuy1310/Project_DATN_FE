import { memo, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { FiTrash } from 'react-icons/fi'
import { useParams } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getInputCoursePlaceholder } from '@/lib'
import { useGetTargetCourse, useTargetCourse } from '@/app/hooks/instructors/useInstructor'
import Loading from '@/components/Common/Loading/Loading'

const StudentGoals = memo(() => {
    const { id } = useParams()
    const { mutateAsync: createTargetCourse, isPending } = useTargetCourse()
    const { data, isPending: loadingTargetCourse } = useGetTargetCourse(id!)

    const [inputs, setInputs] = useState({
        goals: Array.from({ length: 4 }, () => ({
            placeholder: getInputCoursePlaceholder('goals'),
            value: ''
        })),
        conditions: [{ placeholder: getInputCoursePlaceholder('conditions'), value: '' }],
        audiences: [{ placeholder: getInputCoursePlaceholder('audiences'), value: '' }]
    })

    const isAnyFieldEmpty = () => {
        const { goals, conditions, audiences } = inputs
        return (
            goals.some((item) => item.value.trim() === '') ||
            conditions.some((item) => item.value.trim() === '') ||
            audiences.some((item) => item.value.trim() === '')
        )
    }

    const handleAdd = (type: 'goals' | 'conditions' | 'audiences') => {
        const items = inputs[type]
        if (items.every((item) => item.value.trim() !== '')) {
            setInputs((prev) => ({
                ...prev,
                [type]: [...prev[type], { placeholder: getInputCoursePlaceholder(type), value: '' }]
            }))
        }
    }

    const handleDelete = (index: number, type: 'goals' | 'conditions' | 'audiences') => {
        setInputs((prev) => {
            const updatedArray = prev[type].filter((_, i) => i !== index)
            return { ...prev, [type]: updatedArray }
        })
    }

    const handleChange = (value: string, index: number, type: 'goals' | 'conditions' | 'audiences') => {
        setInputs((prev) => {
            const updatedArray = [...prev[type]]
            updatedArray[index].value = value
            return { ...prev, [type]: updatedArray }
        })
    }

    const handleSave = async () => {
        const { goals, conditions, audiences } = inputs

        const result = {
            goals: goals.map((item, index) => ({
                goal: item.value,
                position: index + 1
            })),
            requirements: conditions.map((item, index) => ({
                requirement: item.value,
                position: index + 1
            })),
            audiences: audiences.map((item, index) => ({
                audience: item.value,
                position: index + 1
            })),
            _method: 'PUT'
        }

        await createTargetCourse([id!, result])
        return result
    }

    const handleReset = () => {
        setInputs({
            goals: Array.from({ length: 4 }, () => ({
                placeholder: getInputCoursePlaceholder('goals'),
                value: ''
            })),
            conditions: [{ placeholder: getInputCoursePlaceholder('conditions'), value: '' }],
            audiences: [{ placeholder: getInputCoursePlaceholder('audiences'), value: '' }]
        })
    }

    useEffect(() => {
        if (data) {
            const updatedGoals = data.goals.map((item, index: number) => ({
                placeholder: getInputCoursePlaceholder('goals'),
                value: item.goal,
                position: index + 1
            }))
            const updatedConditions = data.requirements.map((item, index: number) => ({
                placeholder: getInputCoursePlaceholder('conditions'),
                value: item.requirement,
                position: index + 1
            }))
            const updatedAudiences = data.audiences.map((item, index: number) => ({
                placeholder: getInputCoursePlaceholder('audiences'),
                value: item.audience,
                position: index + 1
            }))

            setInputs({
                goals: updatedGoals,
                conditions:
                    updatedConditions.length > 0
                        ? updatedConditions
                        : [{ placeholder: getInputCoursePlaceholder('conditions'), value: '' }],
                audiences:
                    updatedAudiences.length > 0
                        ? updatedAudiences
                        : [{ placeholder: getInputCoursePlaceholder('audiences'), value: '' }]
            })
        }
    }, [data])

    if (loadingTargetCourse) {
        return <Loading />
    }

    return (
        <div className="rounded-lg p-5">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-5">
                <h4 className="text-2xl font-semibold capitalize">Mục tiêu học viên</h4>
                <div className="flex gap-3">
                    <Button size="default" variant="destructive" onClick={() => handleReset()} disabled={isPending}>
                        Nhập lại
                    </Button>
                    <Button size="default" onClick={() => handleSave()} disabled={isAnyFieldEmpty() || isPending}>
                        Lưu thông tin
                    </Button>
                </div>
            </div>
            <div className="mt-4 flex flex-col gap-7">
                <p className="text-sm leading-6 text-black">
                    Các mô tả sau sẻ hiển thị công khai trên Trang tổng quan khoá học của bạn và sẽ tác động trực tiếp
                    đến thành tích khoá học, đồng thời giúp học viên quyết định xem khoá học đó có phù hợp với họ hay
                    không.
                </p>

                {/* Mục tiêu học viên */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h5 className="text-base font-bold">Học viên sẽ học được gì trong khoá học của bạn?</h5>
                        <p className="text-sm text-gray-600">
                            Bạn phải nhập ít nhất 4 mục tiêu khoá học hoặc kết quả học tập mà học viên có thể mong đợi
                            sau khi hoàn thành khoá học.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {inputs.goals.map((input, index) => (
                            <div className="group relative max-w-[80%]" key={index}>
                                <Input
                                    placeholder={input.placeholder}
                                    maxLength={160}
                                    value={input.value}
                                    onChange={(e) => handleChange(e.target.value, index, 'goals')}
                                    type="text"
                                    className="w-full pr-[50px]"
                                />
                                {!!input.value && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 hidden h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md opacity-0 transition-opacity duration-200 group-hover:flex group-hover:opacity-100"
                                        onClick={() => handleDelete(index, 'goals')}
                                    >
                                        <FiTrash className="size-4 text-secondaryRed" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <div>
                            <Button
                                variant="outline"
                                className="space-x-2 text-primary hover:text-primary/80"
                                onClick={() => handleAdd('goals')}
                            >
                                <FaPlus />
                                <span>Thêm mục tiêu vào khoá học của bạn</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Yêu cầu tham gia khóa học */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h5 className="text-base font-bold">
                            Yêu cầu hoặc điều kiện tiên quyết để tham gia khóa học của bạn là gì?
                        </h5>
                        <p className="text-sm text-gray-600">
                            Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị mà học viên bắt buộc phải có trước
                            khi tham gia khóa học.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {inputs.conditions.map((input, index) => (
                            <div className="group relative max-w-[80%]" key={index}>
                                <Input
                                    placeholder={input.placeholder}
                                    maxLength={160}
                                    value={input.value}
                                    onChange={(e) => handleChange(e.target.value, index, 'conditions')}
                                    type="text"
                                    className="w-full pr-[50px]"
                                />
                                {!!input.value && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 hidden h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md opacity-0 transition-opacity duration-200 group-hover:flex group-hover:opacity-100"
                                        onClick={() => handleDelete(index, 'conditions')}
                                    >
                                        <FiTrash className="size-4 text-secondaryRed" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <div>
                            <Button
                                variant="outline"
                                className="space-x-2 text-primary hover:text-primary/80"
                                onClick={() => handleAdd('conditions')}
                            >
                                <FaPlus />
                                <span>Thêm mục điều kiện tham gia khoá học khoá học của bạn</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Đối tượng học viên */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h5 className="text-base font-bold">Khóa học này dành cho đối tượng nào?</h5>
                        <p className="text-sm text-gray-600">
                            Viết mô tả rõ ràng về học viên mục tiêu cho khóa học, tức là những người sẽ thấy nội dung
                            khóa học có giá trị. Điều này sẽ giúp bạn thu hút học viên phù hợp tham gia khóa học.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {inputs.audiences.map((input, index) => (
                            <div className="group relative max-w-[80%]" key={index}>
                                <Input
                                    placeholder={input.placeholder}
                                    maxLength={160}
                                    value={input.value}
                                    onChange={(e) => handleChange(e.target.value, index, 'audiences')}
                                    type="text"
                                    className="w-full pr-[50px]"
                                />
                                {!!input.value && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 hidden h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md opacity-0 transition-opacity duration-200 group-hover:flex group-hover:opacity-100"
                                        onClick={() => handleDelete(index, 'audiences')}
                                    >
                                        <FiTrash className="size-4 text-secondaryRed" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <div>
                            <Button
                                variant="outline"
                                className="space-x-2 text-primary hover:text-primary/80"
                                onClick={() => handleAdd('audiences')}
                            >
                                <FaPlus />
                                <span>Thêm mục tiêu vào khoá học của bạn</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default StudentGoals
