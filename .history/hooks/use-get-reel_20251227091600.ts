interface Reel {
    _id: string;
    reel_name: string;
    reel_image: string;
}

const useGetReel = () => {
    const [reel, setReel] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
}