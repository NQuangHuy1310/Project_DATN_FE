import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import AddNode from '@/components/shared/CourseLeaning/Sheet/AddNote'
import AddQA from '@/components/shared/CourseLeaning/Sheet/AddQA'
import { Button } from '@/components/ui/button'
import { getImagesUrl } from '@/lib'
import { HiOutlineChatAlt2, HiPlusSm } from 'react-icons/hi'
import useFormatTime from '@/app/hooks/common/useFomatTime'
import { useUpdateLessonProCess } from '@/app/hooks/courses/useLesson'
import { ILessonLeaning } from '@/types'

const LeaningCourseVideo = ({
    toggleTab,
    dataLesson,
    setCheckButton
}: {
    toggleTab: boolean
    dataLesson: ILessonLeaning
    setCheckButton: Dispatch<SetStateAction<boolean>>
}) => {
    const [qaSheet, setQASheet] = useState<boolean>(false)
    const [nodeSheet, setNodeSheet] = useState<boolean>(false)
    const [videoWatched, setVideoWatched] = useState<boolean>(false)
    const [currentVideoTime, setCurrentVideoTime] = useState<number>(0)
    const [player, setPlayer] = useState<any>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const hasUpdatedProgress = useRef<boolean>(false)

    // Api cập nhật tiến độ
    const { mutateAsync: lessonProcessUpdate } = useUpdateLessonProCess()

    // Kiểm tra nếu lessonable là video thì mới lấy thuộc tính 'url'
    const isYouTubeVideo = dataLesson.lessonable?.type === 'url'
    const videoUrl = isYouTubeVideo
        ? `https://www.youtube.com/embed/${dataLesson.lessonable?.video_youtube_id}`
        : getImagesUrl(dataLesson.lessonable!.url!)

    const updateProgress = async () => {
        if (!hasUpdatedProgress.current) {
            setCheckButton(false)
            await lessonProcessUpdate([
                dataLesson.id!,
                {
                    is_completed: 1,
                    last_time_video: null,
                    _method: 'PUT'
                }
            ])
            hasUpdatedProgress.current = true
        }
    }

    // const saveLastVideoTime = () => {
    //     const lastVideoTime = isYouTubeVideo && videoUrl ? currentVideoTime : videoRef.current?.currentTime

    //     if (lastVideoTime !== undefined) {
    //         localStorage.setItem('last-time-video', lastVideoTime.toString())
    //     }
    // }

    // useEffect(() => {
    //     const handleBeforeUnload = () => {
    //         saveLastVideoTime()
    //     }
    //     window.addEventListener('beforeunload', handleBeforeUnload)

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload)
    //     }
    // }, [dataLesson.id, isYouTubeVideo, videoUrl, currentVideoTime])

    // useEffect(() => {
    //     const lastVideoTime = localStorage.getItem('last-time-video')
    //     if (lastVideoTime) {
    //         const time = Number(lastVideoTime)
    //         setCurrentVideoTime(time)

    //         if (isYouTubeVideo && player) {
    //             player.seekTo(time, true)
    //         } else if (videoRef.current) {
    //             videoRef.current.currentTime = time
    //         }
    //     }
    // }, [isYouTubeVideo, player])
    // Hàm khởi tạo YouTube Player API

    const createYouTubePlayer = () => {
        new window.YT.Player('youtube-player', {
            events: {
                onReady: (event: any) => setPlayer(event.target),
                onStateChange: (event: any) => handlePlayerStateChange(event)
            }
        })
    }
    const initYouTubePlayer = () => {
        if (!window.YT) {
            const script = document.createElement('script')
            script.src = 'https://www.youtube.com/iframe_api'
            window.onYouTubeIframeAPIReady = () => {
                createYouTubePlayer()
            }

            document.body.appendChild(script)
        } else {
            createYouTubePlayer()
        }
    }

    // Hàm tạo YouTube Player khi API đã sẵn sàng
    const handlePlayerStateChange = (event: any) => {
        const playerInstance = event.target
        if (event.data === window.YT.PlayerState.PLAYING) {
            intervalRef.current = setInterval(() => {
                if (playerInstance && typeof playerInstance.playerInfo.currentTime) {
                    const time = playerInstance.playerInfo.currentTime
                    setCurrentVideoTime(time.toFixed(0))
                }
                if (playerInstance.playerInfo.currentTime / dataLesson.lessonable!.duration! >= 0.8) {
                    updateProgress()
                }
            }, 1000)
        }
        if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }

    useEffect(() => {
        if (isYouTubeVideo && videoUrl) {
            initYouTubePlayer()
            return () => {
                if (player) {
                    player.destroy()
                }
            }
        } else if (videoRef.current) {
            const videoElement = videoRef.current
            const handleTimeUpdate = () => {
                console.log(videoElement.duration)
                const currentTime = videoElement.currentTime
                setCurrentVideoTime(Math.floor(currentTime))
                // const backendDuration = dataLesson.lessonable!.duration!
                if (currentTime / videoElement.duration >= 0.8 && !videoWatched) {
                    setVideoWatched(true)
                    updateProgress()
                }
            }

            videoElement.addEventListener('timeupdate', handleTimeUpdate)

            return () => {
                videoElement.removeEventListener('timeupdate', handleTimeUpdate)
            }
        }
    }, [videoWatched, dataLesson.lessonable, videoUrl, isYouTubeVideo, player])

    return (
        <>
            <div className="bg-black">
                {isYouTubeVideo ? (
                    <div id="youtube-player-wrapper">
                        <iframe
                            id="youtube-player"
                            className="mx-auto min-h-[300px] w-full max-w-5xl bg-black md:min-h-[520px]"
                            src={`${videoUrl}?enablejsapi=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <video
                        controls
                        src={videoUrl}
                        ref={videoRef}
                        className="mx-auto min-h-[300px] w-full max-w-5xl bg-black md:min-h-[520px]"
                    ></video>
                )}
            </div>
            <div className="mx-auto max-w-5xl overflow-hidden px-10">
                <div className="mt-10 flex flex-wrap justify-between gap-4">
                    <div className="flex flex-col gap-4">
                        <h2 className="max-w-xl text-2xl font-semibold md:text-4xl">{dataLesson.lessonable!.title}</h2>
                        <span className="md:text-md text-sm">Cập nhật tháng 10 năm 2024</span>
                    </div>
                    <Button
                        className="relative flex !ps-10 shadow-md"
                        onClick={() => {
                            if (isYouTubeVideo && player) {
                                player.pauseVideo()
                            } else if (videoRef.current) {
                                videoRef.current.pause()
                            }
                            setNodeSheet(true)
                        }}
                    >
                        <HiPlusSm className="absolute left-3 top-1/2 size-5 w-fit -translate-y-1/2" />
                        <span className="md:text-md text-sm">Thêm ghi chú tại {useFormatTime(currentVideoTime)}</span>
                    </Button>
                    <AddNode
                        open={nodeSheet}
                        currentVideoTime={currentVideoTime}
                        isOpen={(isOpen) => {
                            setNodeSheet(isOpen)
                            if (!isOpen) {
                                if (isYouTubeVideo && player) {
                                    player.playVideo()
                                } else if (videoRef.current) {
                                    videoRef.current.play()
                                }
                            }
                        }}
                    />
                </div>
                <div dangerouslySetInnerHTML={{ __html: dataLesson.lessonable!.content! }} />
            </div>
            <div className={`fixed bottom-[70px] z-50 ${toggleTab ? 'right-[2%] lg:right-[25%]' : 'right-[2%]'}`}>
                <Button
                    className="flex h-8 text-[#0056d2] shadow-md md:relative md:!ps-10"
                    variant="secondary"
                    onClick={() => {
                        if (isYouTubeVideo && player) {
                            player.pauseVideo()
                        } else if (videoRef.current) {
                            videoRef.current.pause()
                        }
                        setQASheet(true)
                    }}
                >
                    <HiOutlineChatAlt2 className="size-7 md:absolute md:left-2 md:top-1/2 md:-translate-y-1/2" />
                    <span className="hidden md:block">Hỏi đáp</span>
                </Button>
            </div>
            <AddQA
                open={qaSheet}
                isOpen={(isOpen) => {
                    setQASheet(isOpen)
                    if (!isOpen) {
                        if (isYouTubeVideo && player) {
                            player.playVideo()
                        } else if (videoRef.current) {
                            videoRef.current.play()
                        }
                    }
                }}
            />
        </>
    )
}

export default LeaningCourseVideo
