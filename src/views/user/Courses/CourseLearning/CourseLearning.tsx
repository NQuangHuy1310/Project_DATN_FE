import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { FaCheckCircle, FaLock } from 'react-icons/fa'
import {
    HiMenu,
    HiPlay,
    HiPlusSm,
    HiMinusSm,
    HiBookOpen,
    HiDocument,
    HiChevronLeft,
    HiArrowSmRight,
    HiOutlineXCircle,
    HiQuestionMarkCircle
} from 'react-icons/hi'
import logo from '@/assets/Union.svg'

import Loading from '@/components/Common/Loading/Loading'
import { Button } from '@/components/ui/button'
import AllNoteCourse from '@/components/shared/CourseLeaning/Sheet/AllNoteCourse'
import { useLessonById, useQuizLessonById } from '@/app/hooks/courses/useLesson'
import LeaningCourseQuiz from '@/components/shared/CourseLeaning/LeaningCourseQuiz'
import LeaningCourseVideo from '@/components/shared/CourseLeaning/LeaningCourseVideo'
import LeaningCourseDocument from '@/components/shared/CourseLeaning/LeaningCourseDocument'
import { useCourseLeaningBySlug } from '@/app/hooks/courses/useCourse'
import { ILessonLeaning, IModuleLeaning } from '@/types/course/course'
import { useGetIdParams, useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import { formatDurationSecond } from '@/lib/common'

const CourseLearning = () => {
    const [toggleTab, setToggleTab] = useState<boolean>(true)
    const [activeModules, setActiveModules] = useState<number[]>([])
    const [allNodeSheet, setAllNodeSheet] = useState(false)
    const [checkNote, setCheckNote] = useState<boolean>(false)
    const [checkButton, setCheckButton] = useState<boolean>(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const courseListRef = useRef<HTMLDivElement | null>(null)
    const [pauseVideoCallback, setPauseVideoCallback] = useState<() => void>(() => {})
    const [playVideoCallback, setPlayVideoCallback] = useState<() => void>(() => {})

    const [checkQuizLeaning, setCheckQuizLeaning] = useState<boolean>()

    const idLesson = useGetIdParams('id')
    const duration = searchParams.get('time')
    const slug = useGetSlugParams('slug')

    // Danh sách bài học theo khóa học
    const { data: courseModule, isLoading, refetch } = useCourseLeaningBySlug(slug!)

    const quizArray = useMemo(() => {
        return (
            courseModule?.modules.reduce<any[]>((acc, cur) => {
                if (cur.quiz) {
                    acc.push({
                        id: cur.quiz.id,
                        id_module: cur.quiz.id_module,
                        is_completed: cur.quiz.is_completed
                    })
                }
                return acc
            }, []) || []
        )
    }, [courseModule])

    const isQuiz = quizArray.some((quiz: any) => quiz.id === idLesson)

    const { data: courseLesson } = useLessonById(idLesson!, isQuiz)
    const { data: quizLesson } = useQuizLessonById(idLesson!, isQuiz)

    const nextLessonId = courseModule?.next_lesson?.id

    useEffect(() => {
        const currentQuiz = quizArray.find((quiz) => quiz.id === idLesson)
        if (currentQuiz && currentQuiz.is_completed == 1) {
            setCheckQuizLeaning(true)
        }
    }, [idLesson, quizArray])

    useEffect(() => {
        if (courseModule && nextLessonId) {
            if (!idLesson) {
                setSearchParams({ id: nextLessonId.toString() })
            }
        }
    }, [courseModule, idLesson, nextLessonId, setSearchParams])

    // Chi tiết bài học theo id

    const handleToggleTab = useCallback(() => setToggleTab((prev) => !prev), [])

    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (courseListRef.current && !courseListRef.current.contains(e.target as Node) && window.innerWidth < 1024) {
            setToggleTab(false)
        }
    }, [])

    useEffect(() => {
        if (!checkButton) {
            refetch()
        }
    }, [checkButton, refetch])

    const handleLessonClick = useCallback(
        (lessonId: number) => {
            setSearchParams({ id: lessonId.toString() })
        },
        [setSearchParams]
    )

    const handleQuizClick = useCallback(
        (idQuiz: number) => {
            setSearchParams({ id: idQuiz.toString() })
        },
        [setSearchParams]
    )

    const handleToggleModule = useCallback((index: number) => {
        setActiveModules((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }, [])

    useEffect(() => {
        if (toggleTab) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [toggleTab, handleClickOutside])

    useEffect(() => {
        const nextLessonId = courseModule?.next_lesson?.id
        if (!searchParams.get('id') && nextLessonId) {
            setSearchParams({ id: nextLessonId.toString() })
        } else if (searchParams.get('id')) {
            const currentLesson = courseModule?.modules
                .flatMap((module) => module.lessons)
                .find((lesson) => lesson.id === Number(idLesson))
            const currentQuiz = quizArray.find((quiz: any) => quiz.id === Number(idLesson))
            if (currentLesson) {
                if (currentLesson.is_completed === 1) {
                    setCheckButton(false)
                } else {
                    setCheckButton(true)
                }
            } else if (currentQuiz) {
                if (currentQuiz.is_completed === 1) {
                    setCheckButton(false)
                } else {
                    setCheckButton(true)
                }
            }
        }
    }, [courseModule, idLesson, searchParams, setSearchParams])

    useEffect(() => {
        if (courseModule && nextLessonId !== undefined && idLesson !== undefined) {
            const quizModuleIndex = courseModule.modules.findIndex((module) => module.quiz?.id === idLesson)
            if (quizModuleIndex !== -1) {
                const isLastModule = quizModuleIndex === courseModule.modules.length - 1
                if (!isLastModule) {
                    setActiveModules((prev) => [...new Set([...prev, quizModuleIndex])])
                } else {
                    setActiveModules((prev) => [...new Set([...prev, quizModuleIndex + 1])])
                }
            } else {
                const lessonModuleIndex = courseModule.modules.findIndex((module) =>
                    module.lessons.some((lesson) => lesson.id === idLesson)
                )
                if (lessonModuleIndex !== -1) {
                    setActiveModules((pre) => [...new Set([...pre, lessonModuleIndex])])
                }
            }
        }
    }, [courseModule, nextLessonId, idLesson])

    const handleChangeLesson = useCallback(
        (direction: 'next' | 'previous') => {
            if (!courseModule || !idLesson) return

            // Tìm module hiện tại dựa trên bài học hoặc quiz
            const currentModuleIndex = courseModule.modules.findIndex(
                (module) =>
                    module.lessons.some((lesson) => lesson.id === Number(idLesson)) ||
                    module.quiz?.id === Number(idLesson)
            )

            if (currentModuleIndex === -1) return

            const currentModule = courseModule.modules[currentModuleIndex]
            const currentLesson = currentModule.lessons.find((lesson) => lesson.id === Number(idLesson))
            const isQuiz = currentModule.quiz && currentModule.quiz.id === Number(idLesson)

            // Lấy vị trí của bài học hiện tại (nếu có) hoặc 0 nếu là quiz
            const currentLessonPosition = currentLesson ? currentLesson.position : 0
            const hasQuiz = currentModule.quiz !== null

            if (direction === 'next') {
                const nextModuleIndex = currentModuleIndex + 1
                const isLastLesson =
                    currentLesson &&
                    currentLessonPosition === currentModule.lessons[currentModule.lessons.length - 1].position

                if (isLastLesson) {
                    if (hasQuiz) {
                        handleQuizClick(currentModule.quiz.id)
                        return
                    } else if (nextModuleIndex < courseModule.modules.length) {
                        const nextModule = courseModule.modules[nextModuleIndex]
                        const firstLessonOfNextModule = nextModule.lessons[0]
                        setActiveModules((prev) => [...new Set([...prev, nextModuleIndex])])
                        handleLessonClick(firstLessonOfNextModule.id)
                        return
                    }
                }

                const nextLesson = currentModule.lessons.find((lesson) => lesson.position === currentLessonPosition + 1)
                if (nextLesson) {
                    handleLessonClick(nextLesson.id)
                } else if (hasQuiz && nextModuleIndex < courseModule.modules.length) {
                    const nextModule = courseModule.modules[nextModuleIndex]
                    if (!nextModule.quiz) {
                        const firstLessonOfNextModule = nextModule.lessons[0]
                        setActiveModules((prev) => [...new Set([...prev, nextModuleIndex])])
                        handleLessonClick(firstLessonOfNextModule.id)
                    }
                }
            }

            if (direction === 'previous') {
                if (isQuiz) {
                    // Nếu đang ở quiz, quay lại bài học cuối của module hiện tại
                    const lastLessonOfCurrentModule = currentModule.lessons[currentModule.lessons.length - 1]
                    handleLessonClick(lastLessonOfCurrentModule.id)
                    return
                }

                const previousLesson = currentModule.lessons.find(
                    (lesson) => lesson.position === currentLessonPosition - 1
                )

                if (previousLesson) {
                    handleLessonClick(previousLesson.id)
                } else if (currentModuleIndex > 0) {
                    const previousModuleIndex = currentModuleIndex - 1
                    const previousModule = courseModule.modules[previousModuleIndex]
                    const lastLessonOfPreviousModule = previousModule.lessons[previousModule.lessons.length - 1]

                    setActiveModules((prev) => [...new Set([...prev, previousModuleIndex])])

                    if (previousModule.quiz) {
                        handleQuizClick(previousModule.quiz.id)
                    } else {
                        handleLessonClick(lastLessonOfPreviousModule.id)
                    }
                }
            }
        },
        [courseModule, idLesson, handleLessonClick, handleQuizClick, setActiveModules]
    )

    // Lấy ra title module theo bài học hiện tại
    const currentTitleModule = useMemo(() => {
        if (courseModule) {
            return courseModule.modules.find((module: IModuleLeaning) =>
                module.lessons.some((lesson: ILessonLeaning) => lesson.id === idLesson)
            )
        }
        return null
    }, [courseModule, idLesson])

    // Sử dụng tránh render lại list bài học
    const renderedCourseModules = useMemo(
        () =>
            courseModule?.modules.map((module: IModuleLeaning, index: number) => {
                // Tính số bài học đã hoàn thành trong module
                const completedCount =
                    module.lessons.filter((lesson) => lesson.is_completed === 1).length +
                    (module.quiz && module.quiz.is_completed === 1 ? 1 : 0)

                return (
                    <div key={index} className="sticky top-10 my-1">
                        <div
                            onClick={() => handleToggleModule(index)}
                            className="flex cursor-pointer items-center justify-between rounded bg-[#f7f8fa] px-5 py-2 duration-200 hover:bg-[#f0f4fa]"
                        >
                            <div className="items-center gap-2">
                                <h4 className="text-base font-semibold">
                                    {index + 1}. {module.title}
                                </h4>
                                <span className="text-sm">
                                    {completedCount}/{module.quiz ? module.lessons.length + 1 : module.lessons.length}
                                </span>
                            </div>
                            {activeModules.includes(index) ? (
                                <HiMinusSm className="size-5" />
                            ) : (
                                <HiPlusSm className="size-5" />
                            )}
                        </div>
                        {activeModules.includes(index) && (
                            <div className="sticky top-0 z-10 bg-gray-100">
                                {module.lessons.map((lesson: ILessonLeaning, indexLesson) => (
                                    <div
                                        key={lesson.id}
                                        className={`border-b px-7 py-2 ${lesson.id === idLesson ? 'bg-primary/15' : ''} ${
                                            lesson.is_completed === 1 || lesson.id === courseModule.next_lesson.id
                                                ? 'cursor-pointer'
                                                : 'cursor-not-allowed'
                                        }`}
                                        onClick={() => {
                                            if (
                                                lesson.is_completed === 1 ||
                                                lesson.id === courseModule.next_lesson.id
                                            ) {
                                                handleLessonClick(lesson.id)
                                            }
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex max-w-44 flex-col gap-3">
                                                <h4 className="lg:text-md text-sm font-medium">
                                                    {index + 1}.{indexLesson + 1}. {lesson.title}
                                                </h4>
                                                <div className="flex gap-2">
                                                    <div className="flex items-center gap-1">
                                                        {lesson.content_type === 'document' && (
                                                            <HiBookOpen className="size-4 text-primary" />
                                                        )}
                                                        {lesson.content_type === 'quiz' && (
                                                            <HiQuestionMarkCircle className="size-4 text-primary" />
                                                        )}
                                                        {lesson.content_type === 'video' && (
                                                            <HiPlay className="size-4 text-primary" />
                                                        )}
                                                    </div>
                                                    <span className="text-xs">
                                                        {lesson.content_type === 'video' && (
                                                            <p>{formatDurationSecond(lesson.duration!)}</p>
                                                        )}
                                                        {lesson.content_type === 'document' && <p>2:00</p>}
                                                    </span>
                                                </div>
                                            </div>
                                            {lesson.is_completed === 1 ? (
                                                <FaCheckCircle className="size-3 text-primary" />
                                            ) : lesson.id === courseModule.next_lesson.id ? (
                                                <div></div>
                                            ) : (
                                                <FaLock className="size-3 text-darkGrey" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {module.quiz && (
                                    <div
                                        className={`flex items-center justify-between border-b px-7 py-2 ${module.quiz.id === idLesson ? 'bg-primary/15' : ''} ${
                                            courseModule.next_lesson.id === module.quiz.id ||
                                            module.quiz?.is_completed == 1
                                                ? 'cursor-pointer'
                                                : 'cursor-not-allowed'
                                        }`}
                                        onClick={() => {
                                            if (
                                                courseModule.next_lesson.id === module.quiz.id ||
                                                module.quiz?.is_completed == 1
                                            ) {
                                                handleQuizClick(module.quiz.id)
                                            }
                                        }}
                                    >
                                        <div className="flex max-w-44 flex-col gap-3">
                                            <div>
                                                <h4 className="lg:text-md text-sm font-medium">
                                                    {index + 1}. {module.quiz.title}
                                                </h4>
                                            </div>
                                            <div className="flex gap-2">
                                                <HiQuestionMarkCircle className="size-4 text-primary" />
                                                <span className="text-xs">
                                                    <p>2:00</p>
                                                </span>
                                            </div>
                                        </div>
                                        {/* Kiểm tra trạng thái mở khóa cho quiz */}
                                        {module.quiz.is_completed === 1 ? (
                                            <FaCheckCircle className="size-3 text-primary" />
                                        ) : module.quiz.id === courseModule.next_lesson.id ? (
                                            <div></div>
                                        ) : (
                                            <FaLock className="size-3 text-darkGrey" />
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )
            }),
        [courseModule, activeModules, handleLessonClick]
    )

    if (isLoading) return <Loading />

    return (
        <div>
            {/* Header */}
            <header className="fixed z-50 flex h-14 w-full items-center justify-between border-b bg-white px-4 py-2 text-black">
                <div className="flex items-center gap-4">
                    <HiChevronLeft className="size-8 text-white" />
                    <img src={logo} className="hidden rounded-md md:block" alt="Logo" />
                    <h2 className="md:text-md text-sm font-semibold lg:text-lg">{courseModule?.course_name}</h2>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border text-xs md:text-sm">
                            {((courseModule?.completed_lessons! / courseModule?.total_lessons!) * 100).toFixed(0)}%
                        </span>
                        <span className="hidden lg:block">
                            {courseModule?.completed_lessons!}/{courseModule?.total_lessons!} bài học
                        </span>
                    </div>
                    <div
                        className="flex cursor-pointer items-center gap-1"
                        onClick={() => {
                            setAllNodeSheet(true)
                            pauseVideoCallback()
                        }}
                    >
                        <HiDocument className="size-5" />
                        <span className="hidden lg:block">Ghi chú</span>
                    </div>
                    <AllNoteCourse
                        id_course={courseModule?.modules[0].id_course!}
                        checkNote={checkNote}
                        open={allNodeSheet}
                        isOpen={(isOpen) => {
                            setAllNodeSheet(isOpen)
                            if (!isOpen) {
                                playVideoCallback()
                            }
                        }}
                    />
                    <div className="flex items-center gap-1">
                        <HiQuestionMarkCircle className="size-5" />
                        <span className="hidden lg:block">Hướng dẫn</span>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex min-h-screen pt-[58px]">
                <section
                    className={`${toggleTab ? 'w-full lg:w-[77%]' : 'w-full'} relative max-h-[85vh] overflow-y-auto`}
                >
                    {courseLesson && 'content_type' in courseLesson && (
                        <>
                            {courseLesson.content_type === 'document' && (
                                <LeaningCourseDocument dataLesson={courseLesson} setCheckButton={setCheckButton} />
                            )}
                            {courseLesson.content_type === 'video' && (
                                <LeaningCourseVideo
                                    setCheckNote={setCheckNote}
                                    durationNote={duration!}
                                    toggleTab={toggleTab}
                                    dataLesson={courseLesson}
                                    setCheckButton={setCheckButton}
                                    onPauseVideo={(pauseVideo) => setPauseVideoCallback(() => pauseVideo)}
                                    onPlayVideo={(playVideo) => setPlayVideoCallback(() => playVideo)}
                                />
                            )}
                        </>
                    )}
                    {isQuiz == true && quizLesson && (
                        <LeaningCourseQuiz
                            checkQuiz={checkQuizLeaning}
                            dataLesson={quizLesson}
                            setCheckButton={setCheckButton}
                            idCourse={courseModule?.modules[0].id_course!}
                        />
                    )}
                </section>

                {/* Sidebar */}
                <aside
                    ref={courseListRef}
                    className={`absolute top-0 z-50 h-screen w-full overflow-y-auto bg-white px-2 md:w-[50vw] lg:fixed lg:bottom-0 lg:right-0 lg:top-[60px] lg:h-[680px] lg:w-[23%] lg:border-l lg:px-1 ${
                        toggleTab ? 'block' : 'hidden'
                    }`}
                >
                    <div className="w-full">
                        <div className="sticky top-0 z-[1000] flex items-center justify-between bg-white px-2 py-2">
                            <h2 className="text-lg font-semibold">Nội dung khóa học</h2>
                            <HiOutlineXCircle className="size-5 cursor-pointer lg:hidden" onClick={handleToggleTab} />
                        </div>
                        {renderedCourseModules}
                    </div>
                </aside>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 w-full bg-neutral-200 py-2">
                <div className="flex items-center justify-center gap-2">
                    <Button
                        onClick={() => handleChangeLesson('previous')}
                        variant="secondary"
                        className="md:text-md relative h-6 rounded-2xl !ps-5 text-sm md:h-8"
                    >
                        Bài Trước
                    </Button>
                    <Button
                        disabled={checkButton}
                        onClick={() => {
                            handleChangeLesson('next')
                        }}
                        className="md:text-md relative h-6 rounded-2xl text-sm text-white md:h-8"
                    >
                        Bài Tiếp Theo
                    </Button>
                </div>
                <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-2">
                    <h4 className="hidden font-semibold lg:block">{currentTitleModule && currentTitleModule.title}</h4>
                    <div className="cursor-pointer rounded-full bg-white p-1.5" onClick={handleToggleTab}>
                        {toggleTab ? (
                            <HiArrowSmRight className="size-4 md:size-6" />
                        ) : (
                            <HiMenu className="size-4 md:size-6" />
                        )}
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default CourseLearning
