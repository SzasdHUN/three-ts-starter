export type CameraType = "perspective" | "orthographic"

export default interface InitProps {
    cameraType?: CameraType;
    clearColor?: string;
    canvas?: HTMLCanvasElement;
    orthographicSegments?: number;
}