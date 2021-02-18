import { useRouter } from 'next/router';
import React from 'react';

function EmtyComponent() {
    const router = useRouter();
    const query = router.query
    const titlte = query.search ? "Không tìm thấy kết quả" : "Chưa có dữ liệu";
        return (
            <div className="emptyComponent">
                <p>
                    {titlte}
                </p>
            </div>
        );
    }
 
export default EmtyComponent;