import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import AddQA from '@/components/shared/CourseLeaning/Sheet/AddQA'
import AddNode from '@/components/shared/CourseLeaning/Sheet/AddNote'
import { Button } from '@/components/ui/button'
import useFormatTime from '@/app/hooks/common/useFomatTime'
import { getImagesUrl } from '@/lib'
import { ILessonLeaning } from '@/types/course/course'
import { useUpdateLessonProCess } from '@/app/hooks/courses/useLesson'

import { HiOutlineChatAlt2, HiPlusSm } from 'react-icons/hi'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

const LeaningCourseVideo = ({
    slug,
    idCourse,
    toggleTab,
    dataLesson,
    checkLesson,
    durationNote,
    setCheckNote,
    onPauseVideo,
    onPlayVideo
}: {
    slug: string
    idCourse: number
    toggleTab: boolean
    dataLesson: ILessonLeaning
    checkLesson: number
    durationNote?: number
    setCheckNote: Dispatch<SetStateAction<boolean>>
    onPauseVideo: (pause: () => void) => void
    onPlayVideo: (play: () => void) => void
}) => {
    const [qaSheet, setQASheet] = useState<boolean>(false)
    const [nodeSheet, setNodeSheet] = useState<boolean>(false)
    const [videoWatched, setVideoWatched] = useState<boolean>(false)
    const [currentVideoTime, setCurrentVideoTime] = useState<number>(0)
    const [player, setPlayer] = useState<any>(null)
    const [open, setOpen] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const playerRef = useRef<any>(null)
    const hasUpdatedProgress = useRef<boolean>(false)

    const { mutateAsync: lessonProcessUpdate } = useUpdateLessonProCess(slug)

    const isYouTubeVideo = dataLesson.lessonable?.type === 'url'
    const videoUrl = isYouTubeVideo
        ? `https://www.youtube.com/embed/${dataLesson.lessonable?.video_youtube_id}`
        : getImagesUrl(dataLesson.lessonable!.url!)

    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime)
        return `Ngày ${date.getDay()} tháng ${date.getMonth()} năm ${date.getFullYear()}`
    }

    const updateProgress = async () => {
        if (!hasUpdatedProgress.current) {
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

    const createYouTubePlayer = () => {
        new window.YT.Player('youtube-player', {
            events: {
                onReady: (event: any) => {
                    playerRef.current = event.target
                    setPlayer(event.target)
                },
                onStateChange: handlePlayerStateChange
            }
        })
    }

    const removeTimeFromUrl = () => {
        const url = new URL(window.location.href)
        const params = new URLSearchParams(url.search)
        params.delete('time')
        window.history.replaceState({}, '', `${url.pathname}?${params.toString()}`)
    }

    useEffect(() => {
        if (durationNote && !isNaN(Number(durationNote)) && player && typeof player.seekTo === 'function') {
            const time = Number(durationNote)
            setCurrentVideoTime(time)
            removeTimeFromUrl()
            if (isYouTubeVideo) {
                player.seekTo(time, true)
            } else if (videoRef.current) {
                videoRef.current.currentTime = time
            }
        }
    }, [durationNote, player])

    const pauseVideo = () => {
        if (isYouTubeVideo && player) {
            player.pauseVideo()
        } else if (videoRef.current) {
            videoRef.current.pause()
        }
    }

    const playVideo = () => {
        if (isYouTubeVideo && player) {
            player.playVideo()
        } else if (videoRef.current) {
            videoRef.current.play()
        }
    }

    useEffect(() => {
        onPauseVideo(pauseVideo)
        onPlayVideo(playVideo)
    }, [player])

    const videoStartTimeRef = useRef<number | null>(null)
    const timeCheckRef = useRef<number>(dataLesson.lessonable!.duration! / 2)

    const handlePlayerStateChange = (event: any) => {
        const playerInstance = event.target
        const playerReset = playerRef.current
        if (event.data === window.YT.PlayerState.PLAYING) {
            if (!videoStartTimeRef.current) {
                videoStartTimeRef.current = Date.now()
            }
            if (!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                    const time = playerInstance.playerInfo.currentTime
                    setCurrentVideoTime(Math.floor(time))
                    if (checkLesson !== 1) {
                        const currentTime = Date.now()
                        const elapsedTime = (currentTime - (videoStartTimeRef.current || currentTime)) / 1000
                        timeCheckRef.current = timeCheckRef.current + elapsedTime
                        if (time > timeCheckRef.current) {
                            playerReset.pauseVideo()
                            setOpen(true)
                        } else if (time / dataLesson?.lessonable?.duration! > 0.8) {
                            updateProgress()
                        }
                        videoStartTimeRef.current = currentTime
                    }
                }, 500)
            }
        }

        if (event.data === window.YT.PlayerState.PAUSED) {
            if (videoStartTimeRef.current) {
                videoStartTimeRef.current = null
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }

        if (event.data === window.YT.PlayerState.ENDED) {
            if (videoStartTimeRef.current) {
                videoStartTimeRef.current = null
            }

            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }

    const handleDialogClose = () => setOpen(false)

    useEffect(() => {
        if (isYouTubeVideo && videoUrl) {
            createYouTubePlayer()
            return () => {
                player?.destroy()
            }
        } else if (videoRef.current) {
            const videoElement = videoRef.current
            const handleTimeUpdate = () => {
                const currentTime = videoElement.currentTime
                setCurrentVideoTime(Math.floor(currentTime))
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
    }, [isYouTubeVideo, videoUrl])

    return (
        <div>
            <div className="bg-black">
                {isYouTubeVideo ? (
                    <div id="youtube-player-wrapper">
                        <iframe
                            id="youtube-player"
                            key={videoUrl}
                            className="mx-auto min-h-[300px] w-full max-w-5xl bg-black md:min-h-[520px]"
                            src={`${videoUrl}?enablejsapi=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <video
                        controls
                        key={videoUrl}
                        src={videoUrl}
                        ref={videoRef}
                        className="mx-auto min-h-[300px] w-full max-w-5xl bg-black md:min-h-[520px]"
                    ></video>
                )}
            </div>
            <div className="mx-auto max-w-5xl overflow-hidden px-10">
                <div className="mt-10 flex flex-wrap justify-between gap-4">
                    <div className="flex flex-col gap-4">
                        <h2 className="max-w-xl text-xl font-semibold md:text-2xl">{dataLesson.lessonable!.title}</h2>
                        <span className="md:text-md text-sm">Cập nhật tháng {formatDate(dataLesson.created_at)}</span>
                    </div>
                    <Button
                        className="relative flex !ps-10 shadow-md"
                        onClick={() => {
                            pauseVideo()
                            setNodeSheet(true)
                        }}
                    >
                        <HiPlusSm className="absolute left-3 top-1/2 size-5 w-fit -translate-y-1/2" />
                        <span className="md:text-md text-sm">Thêm ghi chú tại {useFormatTime(currentVideoTime)}</span>
                    </Button>
                    <AddNode
                        idCourse={idCourse}
                        lessonData={dataLesson}
                        open={nodeSheet}
                        setCheckNote={setCheckNote}
                        currentVideoTime={currentVideoTime}
                        isOpen={(isOpen) => {
                            setNodeSheet(isOpen)
                            if (!isOpen) {
                                playVideo()
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
                        pauseVideo()
                        setQASheet(true)
                    }}
                >
                    <HiOutlineChatAlt2 className="size-7 md:absolute md:left-2 md:top-1/2 md:-translate-y-1/2" />
                    <span className="hidden md:block">Hỏi đáp</span>
                </Button>
            </div>
            <AddQA
                commentId={dataLesson?.id}
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
            <Dialog open={open} onOpenChange={handleDialogClose}>
                <DialogContent className="w-96">
                    <DialogTitle>Bạn đang học quá nhanh !</DialogTitle>
                    <DialogDescription>
                        Bạn đang tua video quá nhanh. Hãy xem video đúng tiến độ để đảm bảo học tốt hơn.
                    </DialogDescription>
                    <Button className="mt-2" onClick={handleDialogClose}>
                        OK
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LeaningCourseVideo
