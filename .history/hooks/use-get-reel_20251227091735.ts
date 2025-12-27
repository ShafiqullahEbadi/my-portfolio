interface Reel {
    title: string;
    reel: string;
}

const useGetReel = () => {
    const [reel, setReel] = useState<Reel[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
}