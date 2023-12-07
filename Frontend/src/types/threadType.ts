export type TypeThread = {
    id: number;
    content: string;
    image: string;
    created_at: string;
    updated_at: string;
    created_by: {
        username: string;
        full_name: string;
        photo_profile: string;
    };
    number_of_replies: { // Ini harus berupa array jika bisa ada banyak balasan.
        id: number;
        content: string;
        image?: string; // Tambahkan ini jika ada gambar dalam balasan.
        created_at: string;
        update_at?: string; // Opsional jika tidak selalu ada.
    }[];
    like: { // Ini adalah array dari like, bukan hanya satu objek.
        id: number;
        created_at: string;
        update_at?: string; // Opsional jika tidak selalu ada.
        user_id: {
            id: number;
            username: string;
            full_name: string;
            email: string;
            password: string; // Ini sebaiknya tidak disertakan dalam tipe karena alasan keamanan.
            photo_profile: string;
            bio: string;
            created_at: string;
            updated_at: string;
        };
    }[];
    likes_count?: number; // Opsional jika tidak selalu ada.
    replies_count?: number; // Opsional jika tidak selalu ada.
    isLiked?: boolean; // Opsional jika tidak selalu ada.
}
