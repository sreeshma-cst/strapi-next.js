import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
    id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    onDelete: (id: string) => void;
}

export default function BlogCard({
    id,
    title,
    excerpt,
    imageUrl,
    onDelete,
}: BlogCardProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover mb-4"
                />
                <p>{excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Link href={`/ui/blog/${id}`}>
                    <Button variant="outline">Read More</Button>
                </Link>
                <Button variant="destructive" onClick={() => onDelete(id)}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
