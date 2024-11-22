import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

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
import { FaMedal } from 'react-icons/fa6'
import { HiMiniCodeBracket } from 'react-icons/hi2'
import { FaCheckCircle, FaLock } from 'react-icons/fa'

import routes from '@/configs/routes'
import Loading from '@/components/Common/Loading/Loading'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/shared/CourseLeaning/Sheet/CodeEditor'
import AllNoteCourse from '@/components/shared/CourseLeaning/Sheet/AllNoteCourse'
import LeaningCourseQuiz from '@/components/shared/CourseLeaning/LeaningCourseQuiz'
import LeaningCourseVideo from '@/components/shared/CourseLeaning/LeaningCourseVideo'
import LeaningCourseDocument from '@/components/shared/CourseLeaning/LeaningCourseDocument'
import { formatDurationSecond } from '@/lib/common'
import { usePostCertification } from '@/app/hooks/others/useOthers'
import { useCourseLeaningBySlug } from '@/app/hooks/courses/useCourse'
import { ILessonLeaning, IModuleLeaning } from '@/types/course/course'
import { useLessonById, useQuizLessonById } from '@/app/hooks/courses/useLesson'
import { useGetIdParams, useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import CourseHistoryButton from '@/components/shared/CourseHistoryButton/CourseHistoryButton'

const CourseLearning = () => {
    const [toggleTab, setToggleTab] = useState<boolean>(true)
    const [activeModules, setActiveModules] = useState<number[]>([])
    const [allNodeSheet, setAllNodeSheet] = useState(false)
    const [checkNote, setCheckNote] = useState<boolean>(false)
    const [checkButton, setCheckButton] = useState<boolean>(true)
    const [isToggledCode, setIsToggledCode] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const courseListRef = useRef<HTMLDivElement | null>(null)
    const [pauseVideoCallback, setPauseVideoCallback] = useState<() => void>(() => {})
    const [playVideoCallback, setPlayVideoCallback] = useState<() => void>(() => {})
    const [checkQuizLeaning, setCheckQuizLeaning] = useState<boolean>()
    const [codeCertification, setCodeCertification] = useState<string>()

    const navigate = useNavigate()

    const idLesson = useGetIdParams('id')
    const timeNote = useGetIdParams('time')
    const slug = useGetSlugParams('slug')

    const handleToggleCode = () => setIsToggledCode(!isToggledCode)

    // Tạo chứng chỉ
    const { mutateAsync: postCertification } = usePostCertification()
    // call api lấy code chứng chỉ

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

    // Lấy bài học hiện tạo
    const currentModule = courseModule?.modules.find((module) => module.quiz?.id === idLesson)

    // Kiểm tra bài học hiện tại phải bài cuối không
    const isLastQuiz = currentModule?.quiz?.is_last_quiz || 0

    const isQuiz = quizArray.some((quiz: any) => quiz.id === idLesson)

    const { data: courseLesson } = useLessonById(idLesson!, isQuiz)
    const { data: quizLesson } = useQuizLessonById(idLesson!, isQuiz)

    const lessons = courseModule?.modules?.flatMap((module) => module.lessons) || []
    const isLessonInModule = lessons.some((lesson) => lesson.id === idLesson)
    const nextLessonId = courseModule?.next_lesson?.id

    const handlePostCertification = async (id: number) => {
        const data = await postCertification([id])
        setCodeCertification(data.code)
    }

    useEffect(() => {
        const currentQuiz = quizArray.find((quiz) => quiz.id === idLesson)
        if (currentQuiz && currentQuiz.is_completed == 1) {
            setCheckQuizLeaning(true)
        }
    }, [idLesson, quizArray])

    useEffect(() => {
        if (courseModule && !isLessonInModule && nextLessonId) {
            if (!idLesson) {
                setSearchParams({ id: nextLessonId.toString() })
            }
        }
        if (courseModule && !nextLessonId && courseModule.progress_percent == 100 && !idLesson) {
            const lastQuiz = courseModule.modules
                ?.flatMap((module) => module.quiz)
                ?.find((quiz) => quiz.is_last_quiz == 1)

            if (lastQuiz) {
                setSearchParams({ id: lastQuiz.id.toString() })
            }
        }
    }, [courseModule, isLessonInModule, idLesson, nextLessonId, setSearchParams])

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
        if (courseModule && idLesson !== undefined) {
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
        if (courseModule && courseModule.progress_percent == 100) {
            const lastQuiz = courseModule.modules
                ?.flatMap((module) => module.quiz)
                ?.find((quiz) => quiz.is_last_quiz == 1)
            const quizModuleIndexLast = courseModule.modules.findIndex((module) => module.quiz?.id === lastQuiz?.id)
            setActiveModules((prev) => [...new Set([...prev, quizModuleIndexLast])])
        }
    }, [courseModule, idLesson])

    const handleChangeLesson = useCallback(
        (direction: 'next' | 'previous') => {
            if (!courseModule || !idLesson) return

            const currentModuleIndex = courseModule.modules.findIndex(
                (module) =>
                    module.lessons.some((lesson) => lesson.id === Number(idLesson)) ||
                    module.quiz?.id === Number(idLesson)
            )

            if (currentModuleIndex === -1) return

            const currentModule = courseModule.modules[currentModuleIndex]
            const currentLessonIndex = currentModule.lessons.findIndex((lesson) => lesson.id === Number(idLesson))
            const isQuiz = currentModule.quiz && currentModule.quiz.id === Number(idLesson)
            const hasQuiz = currentModule.quiz !== null

            if (direction === 'next') {
                // Nếu bài học cuối cùng trong module
                if (currentLessonIndex === currentModule.lessons.length - 1 || isQuiz) {
                    const nextModuleIndex = currentModuleIndex + 1

                    if (hasQuiz && !isQuiz) {
                        // Nếu có quiz và chưa ở quiz, chuyển tới quiz
                        handleQuizClick(currentModule.quiz.id)
                        return
                    } else if (nextModuleIndex < courseModule.modules.length) {
                        // Chuyển sang bài học đầu tiên của module kế tiếp
                        const nextModule = courseModule.modules[nextModuleIndex]
                        const firstLessonOfNextModule = nextModule.lessons[0]
                        setActiveModules((prev) => [...new Set([...prev, nextModuleIndex])])
                        handleLessonClick(firstLessonOfNextModule.id)
                        return
                    }
                } else {
                    // Chuyển tới bài học tiếp theo trong module hiện tại
                    const nextLesson = currentModule.lessons[currentLessonIndex + 1]
                    if (nextLesson) {
                        handleLessonClick(nextLesson.id)
                    }
                }
            }

            if (direction === 'previous') {
                if (isQuiz) {
                    // Nếu đang ở quiz, quay về bài học cuối cùng của module
                    const lastLessonOfCurrentModule = currentModule.lessons[currentModule.lessons.length - 1]
                    handleLessonClick(lastLessonOfCurrentModule.id)
                    return
                } else if (currentLessonIndex > 0) {
                    // Quay lại bài học trước trong cùng module
                    const previousLesson = currentModule.lessons[currentLessonIndex - 1]
                    handleLessonClick(previousLesson.id)
                } else if (currentModuleIndex > 0) {
                    // Quay lại module trước nếu hết bài học trong module hiện tại
                    const previousModuleIndex = currentModuleIndex - 1
                    const previousModule = courseModule.modules[previousModuleIndex]
                    setActiveModules((prev) => [...new Set([...prev, previousModuleIndex])])

                    if (previousModule.quiz) {
                        handleQuizClick(previousModule.quiz.id)
                    } else {
                        const lastLessonOfPreviousModule = previousModule.lessons[previousModule.lessons.length - 1]
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
                    <div key={index} className="my-1">
                        <div
                            onClick={() => handleToggleModule(index)}
                            className="sticky top-10 z-10 flex cursor-pointer items-center justify-between rounded bg-[#f7f8fa] px-5 py-2 duration-200 hover:bg-[#f0f4fa]"
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
                            <div className="bg-gray-100">
                                {module.lessons.map((lesson: ILessonLeaning, indexLesson) => (
                                    <div
                                        key={lesson.id}
                                        className={`border-b px-7 py-2 ${lesson.id === idLesson ? 'bg-primary/15' : ''} ${
                                            lesson.is_completed === 1 ||
                                            (courseModule.next_lesson && lesson.id === courseModule.next_lesson.id)
                                                ? 'cursor-pointer'
                                                : 'cursor-not-allowed'
                                        }`}
                                        onClick={() => {
                                            if (
                                                lesson.is_completed === 1 ||
                                                (courseModule.next_lesson && lesson.id === courseModule.next_lesson.id)
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
                                            {lesson && lesson.is_completed === 1 ? (
                                                <FaCheckCircle className="size-3 text-primary" />
                                            ) : courseModule.next_lesson &&
                                              lesson &&
                                              lesson.id === courseModule.next_lesson.id ? (
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
                                            (courseModule.next_lesson &&
                                                courseModule.next_lesson.id === module.quiz.id) ||
                                            module.quiz?.is_completed == 1
                                                ? 'cursor-pointer'
                                                : 'cursor-not-allowed'
                                        }`}
                                        onClick={() => {
                                            if (
                                                (courseModule.next_lesson &&
                                                    courseModule.next_lesson.id === module.quiz.id) ||
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
                                        {module.quiz && module.quiz.is_completed === 1 ? (
                                            <FaCheckCircle className="size-3 text-primary" />
                                        ) : courseModule.next_lesson &&
                                          module.quiz &&
                                          module.quiz.id === courseModule.next_lesson.id ? (
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
                    <HiChevronLeft onClick={() => navigate(routes.myCourses)} className="size-8 cursor-pointer" />
                    <img
                        src={logo}
                        className="hidden cursor-pointer rounded-md md:block"
                        alt="Logo"
                        onClick={() => navigate(routes.userDashboard)}
                    />
                    <h2 className="md:text-md text-sm font-semibold lg:text-lg">{courseModule?.course_name}</h2>
                </div>
                <div className="flex items-center gap-5">
                    {courseModule?.completed_lessons == courseModule?.total_lessons ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                className="relative outline-none transition hover:opacity-75"
                                onClick={() => handlePostCertification(courseModule?.modules[0].id_course!)}
                            >
                                <div className="flex cursor-pointer items-center gap-3">
                                    <FaMedal className="size-5 text-primary" />
                                    <span>Nhận giấy chứng nhận</span>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-52">
                                <DropdownMenuGroup className="flex flex-col gap-3 p-2">
                                    <span className="text-base font-semibold">
                                        Đã hoàn thành {courseModule?.completed_lessons!} /{' '}
                                        {courseModule?.total_lessons!}
                                    </span>
                                    <Button
                                        disabled={codeCertification ? false : true}
                                        onClick={() =>
                                            navigate(routes.certification.replace(':code', codeCertification!))
                                        }
                                    >
                                        {codeCertification ? 'Nhận giấy chứng nhận' : 'Đang tải chứng chỉ ...'}
                                    </Button>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border text-xs md:text-sm">
                                {((courseModule?.completed_lessons! / courseModule?.total_lessons!) * 100).toFixed(0)}%
                            </span>
                            <span className="hidden lg:block">
                                {courseModule?.completed_lessons!}/{courseModule?.total_lessons!} bài học
                            </span>
                        </div>
                    )}
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
                    <div
                        onClick={handleToggleCode}
                        className="relative h-[30px] w-[60px] cursor-pointer rounded-full border bg-white"
                    >
                        <div
                            className={`absolute top-0 h-[28px] w-7 rounded-full p-1 text-white transition-transform duration-300 ${
                                isToggledCode ? 'bg-blue-500' : 'bg-darkGrey/80'
                            }`}
                            style={{
                                transform: isToggledCode ? 'translateX(30px)' : 'translateX(0)'
                            }}
                        >
                            <HiMiniCodeBracket className="h-full w-full" />
                        </div>
                    </div>
                    <CodeEditor
                        open={isToggledCode}
                        isOpen={(isOpen) => {
                            setIsToggledCode(isOpen)
                            if (!isOpen) {
                                playVideoCallback()
                            }
                        }}
                    />
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
                                <LeaningCourseDocument
                                    dataLesson={courseLesson}
                                    setCheckButton={setCheckButton}
                                    toggleTab={toggleTab}
                                />
                            )}
                            {courseLesson.content_type === 'video' && (
                                <LeaningCourseVideo
                                    setCheckNote={setCheckNote}
                                    toggleTab={toggleTab}
                                    dataLesson={courseLesson}
                                    durationNote={timeNote!}
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
                            isLastQuiz={isLastQuiz}
                        />
                    )}
                </section>

                {/* Sidebar */}
                <aside
                    ref={courseListRef}
                    className={`absolute top-0 z-50 h-[86vh] w-full overflow-y-auto bg-white px-2 md:w-[50vw] lg:fixed lg:bottom-0 lg:right-0 lg:top-[60px] lg:w-[23%] lg:border-l lg:px-1 ${
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
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <CourseHistoryButton />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <Button
                        onClick={() => handleChangeLesson('previous')}
                        variant="secondary"
                        disabled={idLesson === courseModule?.modules[0].lessons[0].id}
                        className="md:text-md relative h-6 rounded-2xl !ps-5 text-sm md:h-8"
                    >
                        Bài Trước
                    </Button>
                    <Button
                        disabled={!isLastQuiz ? checkButton : true}
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
