import React, { useEffect, useRef, useState } from 'react'

import { FaLock } from 'react-icons/fa'
import {
    HiMenu,
    HiPlay,
    HiPlusSm,
    HiMinusSm,
    HiBookOpen,
    HiDocument,
    HiChevronLeft,
    HiArrowSmRight,
    HiChevronRight,
    HiOutlineXCircle,
    HiOutlineChatAlt2,
    HiQuestionMarkCircle
} from 'react-icons/hi'

import { Textarea } from '@/components/ui/textarea'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { courseLeaning } from '@/constants/mockData'

const CourseLearning = () => {
    const [toggleTab, setToggleTab] = useState<boolean>(true)
    const [activeModules, setActiveModules] = useState<number[]>([])
    const courseListRef = useRef<HTMLDivElement | null>(null)

    const activeToggleTab = () => setToggleTab(!toggleTab)

    const handleClickOutside = (e: MouseEvent) => {
        if (courseListRef.current && !courseListRef.current.contains(e.target as Node)) {
            if (window.innerWidth < 1024) setToggleTab(false)
        }
    }
    const handleToggleModule = (index: number) => {
        setActiveModules((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }

    useEffect(() => {
        if (toggleTab) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [toggleTab])

    return (
        <div>
            {/* Header Leaning */}
            <header className="fixed z-50 flex h-14 w-full items-center justify-between bg-black px-4 py-2 text-white">
                <div className="flex items-center gap-4">
                    <HiChevronLeft className="size-8 text-white" />
                    <div className="hidden md:block">
                        <img
                            src="https://bizweb.dktcdn.net/100/453/393/themes/894913/assets/logo.png?1707187039390"
                            alt=""
                        />
                    </div>
                    <div>
                        <h2 className="md:text-md text-sm font-semibold lg:text-lg">Kiến thức nhập môn IT</h2>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <span className="block rounded-full border p-1 text-xs md:p-1.5 md:text-sm">0%</span>
                        <span className="text-md hidden lg:block">0/12 bài học</span>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <div className="flex cursor-pointer items-center gap-1">
                                <HiDocument className="size-5" />
                                <span className="text-md hidden lg:block">Ghi chú</span>
                            </div>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetTitle>Thêm ghi chú mới</SheetTitle>
                            <SheetDescription className="max-h-screen overflow-y-auto">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur debitis atque
                                possimus suscipit nostrum adipisci, excepturi architecto, quos molestiae, minus aliquid
                                delectus qui culpa exercitationem nam officia praesentium dolorem inventore.
                                Dignissimos, dolore illo magni iste quidem quam sunt exercitationem ipsa debitis
                                recusandae repellat, necessitatibus voluptatem doloremque explicabo tempore perferendis
                                temporibus labore voluptatibus sit illum quas quisquam perspiciatis consequatur itaque?
                                Sit? Totam neque atque minima ipsa adipisci possimus aperiam quia dolores mollitia
                                dolorum optio qui voluptate, voluptates voluptatem inventore error quidem quae quibusdam
                                saepe unde ullam? Quod, nam culpa. Reprehenderit, beatae? Rem, molestiae quo? Atque
                                obcaecati doloribus est et aperiam provident quod eligendi nihil ipsam, laudantium
                                libero maiores, voluptate deleniti perspiciatis mollitia non voluptas accusamus sapiente
                                laborum, rem ratione consectetur quis! Libero natus officiis cum cumque aut. Animi rem
                                omnis doloremque quam nulla placeat consequatur illum perferendis odio laboriosam, quo
                                cupiditate sed, porro expedita provident dignissimos vitae ipsa neque odit illo. Dolores
                                suscipit quis totam non aperiam, expedita qui nam nemo harum? Laudantium ipsum incidunt
                                minus numquam est ducimus optio nesciunt accusantium eligendi veritatis, consequuntur
                            </SheetDescription>
                        </SheetContent>
                    </Sheet>

                    <div className="flex items-center gap-1">
                        <HiQuestionMarkCircle className="size-5" />
                        <span className="text-md hidden lg:block">Hướng dẫn</span>
                    </div>
                </div>
            </header>

            <main className="flex min-h-screen pt-[58px]">
                <section
                    className={`${toggleTab ? 'w-full lg:w-[77%]' : 'w-full'} relative max-h-[85vh] overflow-y-auto`}
                >
                    <div className="">
                        <div className="bg-black">
                            <iframe
                                src="https://www.youtube.com/embed/R6plN3FvzFY"
                                className="mx-auto min-h-[300px] w-full max-w-5xl bg-black md:min-h-[520px]"
                            ></iframe>
                        </div>

                        {/* Chỉ hiển thị khi bài học là bài kiểm tra */}
                        {/* <div>
                            <CodeEditor />
                        </div> */}
                    </div>

                    {/* Chỉ hiển thị khi bài học là video */}
                    <div className="mx-auto max-w-5xl overflow-hidden px-10">
                        <div className="mt-10 flex flex-wrap justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold md:text-4xl">Mô hình Client - Server là gì?</h2>
                                <span className="md:text-md text-sm">Cập nhật tháng 11 năm 2022</span>
                            </div>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button className="relative flex !ps-10 shadow-md">
                                        <HiPlusSm className="absolute left-3 top-1/2 size-5 w-fit -translate-y-1/2" />
                                        <span className="md:text-md text-sm">Thêm ghi chú tại 00.00</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="bottom"
                                    className={`z-[999] w-full overflow-y-auto border bg-white py-3 transition-all duration-500 ease-in-out`}
                                >
                                    <div className="mx-auto max-h-screen max-w-6xl overflow-y-auto px-12">
                                        <div className="flex items-center gap-2 py-2">
                                            <SheetTitle className="text-xl font-semibold">Thêm ghi chú tại</SheetTitle>
                                            <Button className="h-7">00.00</Button>
                                        </div>
                                        <div className="py-2">
                                            <Textarea
                                                name=""
                                                id=""
                                                className="min-h-25 block w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                                                    const target = e.target as HTMLTextAreaElement
                                                    target.style.height = 'auto'
                                                    target.style.height = `${target.scrollHeight}px`
                                                }}
                                            />
                                            <div className="mt-5 flex justify-end gap-2">
                                                <SheetClose>
                                                    <Button className="uppercase" variant="secondary">
                                                        Hủy bỏ
                                                    </Button>
                                                </SheetClose>

                                                <Button className="uppercase">Tạo ghi chú</Button>
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt distinctio magnam
                            accusantium voluptatum, minima soluta quaerat alias id sapiente accusamus a doloribus
                            quisquam praesentium nesciunt dolore, sequi nulla ut illo! Ut libero inventore nihil impedit
                            officia. Ex officia aperiam atque aliquid eveniet deleniti iusto eum, quidem voluptates
                            labore quas perspiciatis quam alias? Nobis adipisci quas id sequi culpa consectetur quae?
                            Natus explicabo repellat amet ab magnam magni voluptatibus dolorum, cumque pariatur,
                            perferendis adipisci itaque! Exercitationem et excepturi sapiente similique fuga, voluptate
                            veniam, animi voluptas voluptatum ratione corporis magnam tempora ea! Non similique sunt id
                            nihil dicta, tenetur voluptatem laboriosam nulla fugit sapiente modi quisquam laudantium
                            corrupti inventore aliquam deleniti tempora dolores est commodi. Atque autem at dicta
                            dignissimos molestiae perferendis! Praesentium dolore, dicta placeat facilis nam deserunt
                            rem pariatur temporibus magnam eum, modi totam, eveniet labore! Assumenda, quasi natus quae
                            deserunt cumque distinctio quas, reiciendis earum, exercitationem rerum iste voluptatum?
                        </div>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <div
                                className={`fixed bottom-[70px] z-50 ${
                                    toggleTab ? 'right-[2%] lg:right-[25%]' : 'right-[2%]'
                                }`}
                            >
                                <Button
                                    className="flex h-8 text-[#0056d2] shadow-md md:relative md:!ps-10"
                                    variant="secondary"
                                >
                                    <HiOutlineChatAlt2 className="size-7 md:absolute md:left-2 md:top-1/2 md:-translate-y-1/2" />
                                    <span className="hidden md:block">Hỏi đáp</span>
                                </Button>
                            </div>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetTitle>Thêm ghi chú mới</SheetTitle>
                            <SheetDescription className="max-h-screen overflow-y-auto">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id placeat earum reiciendis
                                harum ratione
                            </SheetDescription>
                        </SheetContent>
                    </Sheet>
                </section>
                <aside
                    ref={courseListRef}
                    className={`absolute top-0 z-50 h-screen w-full overflow-y-auto bg-white px-2 md:w-[50vw] lg:fixed lg:bottom-0 lg:right-0 lg:top-[60px] lg:h-[619px] lg:w-[23%] lg:border-l lg:px-1 ${
                        toggleTab ? 'block' : 'hidden'
                    }`}
                >
                    <div className="w-full">
                        <div className="sticky top-0 z-[1000] flex items-center justify-between bg-white px-2 py-2">
                            <h2 className="text-lg font-semibold">Nội dung khóa học</h2>
                            <div className="block cursor-pointer lg:hidden" onClick={activeToggleTab}>
                                <HiOutlineXCircle className="size-5" />
                            </div>
                        </div>
                        {courseLeaning.map((course, index) => (
                            <div key={index} className="sticky top-10 my-1">
                                <div
                                    onClick={() => handleToggleModule(index)}
                                    className="flex cursor-pointer items-center justify-between rounded bg-[#e8eef7] px-5 py-2 duration-200 hover:bg-white"
                                >
                                    <div className="items-center gap-2">
                                        <h4 className="text-md font-bold">{course.title}</h4>
                                        <div>
                                            <span className="text-sm">0/{course.lessons.length}</span>
                                            {' | '}
                                            <span className="text-sm">
                                                {course.lessons.reduce((total, lesson) => total + lesson.time, 0)} phút
                                            </span>
                                        </div>
                                    </div>
                                    {activeModules.includes(index) ? (
                                        <HiMinusSm className="size-5" />
                                    ) : (
                                        <HiPlusSm className="size-5" />
                                    )}
                                </div>
                                {activeModules.includes(index) && (
                                    <div className="sticky top-0 z-10 bg-gray-100">
                                        {course.lessons.map((lesson, lessonIndex) => (
                                            <div key={lessonIndex} className="mb-1 border-b px-5 py-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <div>
                                                            <h4 className="lg:text-md text-sm">{lesson.title}</h4>
                                                            <div className="flex items-center gap-1">
                                                                <div className="flex size-5 items-center text-[#0056d2]">
                                                                    {lesson.type === 'docs' && <HiBookOpen />}
                                                                    {lesson.type === 'quiz' && <HiQuestionMarkCircle />}
                                                                    {lesson.type === 'video' && <HiPlay />}
                                                                </div>
                                                                <span className="text-sm">{lesson.time} phút</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <FaLock className="size-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>
            </main>

            {/* Footer Leaning */}
            <footer className="fixed bottom-0 w-full bg-neutral-200 py-2">
                <div>
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="secondary"
                            className="md:text-md text-interactive-primary-default/50 relative h-6 rounded-2xl !ps-8 text-sm md:h-8 md:!pe-5 md:!ps-10"
                        >
                            Bài Trước
                            <HiChevronLeft className="absolute left-3 top-1/2 size-4 -translate-y-1/2 md:size-5" />
                        </Button>
                        <Button className="md:text-md relative h-6 rounded-2xl !pe-8 text-sm text-white md:h-8 md:!pe-10 md:!ps-5">
                            Bài Tiếp Theo
                            <HiChevronRight className="absolute right-3 top-1/2 size-4 -translate-y-1/2 md:size-5" />
                        </Button>
                    </div>
                </div>
                <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-2">
                    <h4 className="text-md hidden font-semibold lg:block">1.Khái niệm cần biết</h4>
                    <div className="cursor-pointer rounded-full bg-white p-1.5" onClick={activeToggleTab}>
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
