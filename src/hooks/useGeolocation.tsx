import { useState, useEffect } from "react";

interface LocationState {
    latitude: number | null;
    longitude: number | null;
    error : string | null;
    loading: boolean;
}

function useGeolocation() : LocationState{
    const [location , setLocation] = useState<LocationState>({
        latitude: null,
        longitude: null ,
        error: null,
        loading: true

    })
    useEffect(() => {
        // 브라우저가 위치 서비스를 지원하는지 확인
        if (!navigator.geolocation) {
            setLocation({
                latitude: null,
                longitude: null,
                error: "브라우저가 위치 정보를 지원하지 않습니다.",
                loading: false,
            });
            return;
        }

        // 위치 정보 요청
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    loading: false,
                });
            },
            (error) => {
                setLocation({
                    latitude: null,
                    longitude: null,
                    error: "위치 정보 권한이 거부 되었거나 , 가져 오지 못 했습니다",
                    loading: false
                });
            }
        );
    }, []);
        return location;
}

export default useGeolocation;