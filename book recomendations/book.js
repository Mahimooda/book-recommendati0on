import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BookOpen, Loader2, AlertTriangle } from 'lucide-react';

interface Book {
    title: string;
    author: string;
    genre: string;
    mood: string[];
    themes: string[];
}

const BookRecommendationApp = () => {
    const [taste, setTaste] = useState('');
    const [author, setAuthor] = useState('');
    const [recommendations, setRecommendations] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sample book data (replace with a real database or API in a production app)
    const allBooks: Book[] = [
        {
            title: "The Secret History",
            author: "Donna Tartt",
            genre: "Mystery",
            mood: ["dark academia", "introspective"],
            themes: ["friendship", "morality"],
        },
        {
            title: "Pride and Prejudice",
            author: "Jane Austen",
            genre: "Romance",
            mood: ["lighthearted", "witty"],
            themes: ["love", "society"],
        },
        {
            title: "Project Hail Mary",
            author: "Andy Weir",
            genre: "Science Fiction",
            mood: ["exciting", "optimistic"],
            themes: ["survival", "discovery"],
        },
        {
            title: "The House in the Cerulean Sea",
            author: "T.J. Klune",
            genre: "Fantasy",
            mood: ["whimsical", "heartwarming"],
            themes: ["acceptance", "family"],
        },
        {
            title: "The Silent Patient",
            author: "Alex Michaelides",
            genre: "Thriller",
            mood: ["suspenseful", "dark"],
            themes: ["psychology", "secrets"],
        },
        {
            title: "Little Fires Everywhere",
            author: "Celeste Ng",
            genre: "Fiction",
            mood: ["thought-provoking", "complex"],
            themes: ["family", "class"],
        },
        {
            title: "Circe",
            author: "Madeline Miller",
            genre: "Mythology",
            mood: ["epic", "lyrical"],
            themes: ["identity", "transformation"],
        },
        {
            title: "Educated",
            author: "Tara Westover",
            genre: "Memoir",
            mood: ["inspiring", "powerful"],
            themes: ["resilience", "education"],
        },
    ];

    const recommendBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        setRecommendations([]);

        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            const tasteArray = taste.toLowerCase().split(',').map((item) => item.trim()).filter((item) => item !== '');
            const authorPreference = author.trim().toLowerCase();

            // Simple recommendation logic (replace with your actual algorithm)
            const filteredBooks = allBooks.filter((book) => {
                const tasteMatch = tasteArray.length === 0 || tasteArray.some((t) => book.genre.toLowerCase().includes(t));
                const authorMatch = !authorPreference || book.author.toLowerCase().includes(authorPreference);

                return tasteMatch && authorMatch;
            });

            // Simulate getting a limited number of recommendations
            const numRecommendations = Math.min(3, filteredBooks.length);
            const randomRecommendations = filteredBooks.sort(() => 0.5 - Math.random()).slice(0, numRecommendations);

            setRecommendations(randomRecommendations);
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching recommendations.');
        } finally {
            setLoading(false);
        }
    }, [taste, author, allBooks]);

    useEffect(() => {
        // Optional: Load initial data or perform setup
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 sm:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 tracking-tight">
                    <BookOpen className="inline-block mr-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500" />
                    Find Your Next Read
                </h1>

                <Card className="shadow-lg border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl text-gray-700">Tell us about your taste:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label htmlFor="taste" className="block text-sm font-medium text-gray-600 mb-1">
                                Taste (Genres):
                            </label>
                            <Input
                                id="taste"
                                type="text"
                                placeholder="e.g., Mystery, Romance, Sci-Fi"
                                value={taste}
                                onChange={(e) => setTaste(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-600 mb-1">
                                Preferred Author (Optional):
                            </label>
                            <Input
                                id="author"
                                type="text"
                                placeholder="e.g., Jane Austen, Stephen King"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <Button
                            onClick={recommendBooks}
                            disabled={loading}
                            className={cn(
                                "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300",
                                loading && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Finding Books...
                                </>
                            ) : (
                                "Get Recommendations"
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {error && (
                    <Card className="bg-red-50 border-red-200 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-red-600 flex items-center">
                                <AlertTriangle className="mr-2 h-5 w-5" />
                                Error
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-red-700">{error}</p>
                        </CardContent>
                    </Card>
                )}

                {recommendations.length > 0 && (
                    <Card className="shadow-lg border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl text-gray-700">
                                We Recommend:
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {recommendations.map((book, index) => (
                                    <li
                                        key={index}
                                        className="p-3 bg-gray-50 rounded-md border border-gray-200"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                                        <p className="text-gray-600">By {book.author}</p>
                                        <p className="text-gray-500 text-sm">Genre: {book.genre}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default BookRecommendationApp;
