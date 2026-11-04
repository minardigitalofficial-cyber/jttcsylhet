const noticeTopics = [
    {
        category: "General",
        department: "B.Ed",
        topic: "২০২৫-২০২৬ শিক্ষাবর্ষে বিএড ভর্তি সংক্রান্ত বিজ্ঞপ্তি",
        downloadUrl: "./src/documents/admission-notice.pdf",
    },
    {
        category: "Exam",
        department: "B.Ed",
        topic: "বিএড প্রথম বর্ষের পরীক্ষার ফরম পূরণের সময়সূচি",
        downloadUrl: "",
    },
    {
        category: "Exam",
        department: "M.Ed",
        topic: "এমএড দ্বিতীয় বর্ষের পরীক্ষার রুটিন",
        downloadUrl: "",
    },
    {
        category: "Result",
        department: "B.Ed",
        topic: "বিএড পরীক্ষার ফলাফল প্রকাশ সংক্রান্ত বিজ্ঞপ্তি",
        downloadUrl: "",
    },
    {
        category: "NOC",
        department: "Office",
        topic: "অনাপত্তি সনদ (NOC) আবেদন সংক্রান্ত নির্দেশনা",
        downloadUrl: "",
    },
    {
        category: "News",
        department: "Office",
        topic: "শিক্ষক প্রশিক্ষণ কর্মশালা ও সেমিনারের সংবাদ",
        downloadUrl: "",
    },
    {
        category: "Office Orders",
        department: "Office",
        topic: "কলেজের অফিস সময়সূচি ও প্রশাসনিক আদেশ",
        downloadUrl: "",
    },
    {
        category: "General",
        department: "Degree",
        topic: "ডিগ্রি তৃতীয় বর্ষের ক্লাস রুটিন প্রকাশ",
        downloadUrl: "./src/documents/exam-routine.pdf",
    },
    {
        category: "Exam",
        department: "Degree",
        topic: "ডিগ্রি শিক্ষার্থীদের নির্বাচনী পরীক্ষার বিজ্ঞপ্তি",
        downloadUrl: "",
    },
    {
        category: "Result",
        department: "M.Ed",
        topic: "এমএড শিক্ষার্থীদের সাময়িক মূল্যায়নের ফলাফল",
        downloadUrl: "",
    },
    {
        category: "News",
        department: "B.Ed",
        topic: "শিক্ষার্থীদের সহশিক্ষা কার্যক্রম ও সাংস্কৃতিক অনুষ্ঠান",
        downloadUrl: "",
    },
    {
        category: "General",
        department: "M.Ed",
        topic: "এমএড শিক্ষাবর্ষের ভর্তি ও নিবন্ধন নির্দেশনা",
        downloadUrl: "",
    },
    {
        category: "Office Orders",
        department: "Office",
        topic: "শিক্ষক ও কর্মচারীদের দাপ্তরিক সভার বিজ্ঞপ্তি",
        downloadUrl: "",
    },
    {
        category: "Exam",
        department: "B.Ed",
        topic: "ব্যবহারিক পরীক্ষা ও পাঠ পরিকল্পনা জমা দেওয়ার নির্দেশনা",
        downloadUrl: "",
    },
    {
        category: "General",
        department: "Degree",
        topic: "শিক্ষার্থীদের উপস্থিতি ও ক্লাসে অংশগ্রহণ সংক্রান্ত নোটিশ",
        downloadUrl: "",
    },
    {
        category: "NOC",
        department: "M.Ed",
        topic: "শিক্ষার্থীদের প্রশিক্ষণ ও সনদপত্রের জন্য NOC আবেদন",
        downloadUrl: "",
    },
    {
        category: "Result",
        department: "Degree",
        topic: "ডিগ্রি বর্ষের অভ্যন্তরীণ পরীক্ষার ফলাফল",
        downloadUrl: "",
    },
    {
        category: "News",
        department: "Office",
        topic: "কলেজের বার্ষিক ক্রীড়া প্রতিযোগিতা ও পুরস্কার বিতরণী",
        downloadUrl: "",
    },
    {
        category: "Office Orders",
        department: "Office",
        topic: "ছুটির দিন ও কলেজ বন্ধ সংক্রান্ত অফিস আদেশ",
        downloadUrl: "",
    },
    {
        category: "General",
        department: "B.Ed",
        topic: "শিক্ষক-শিক্ষার্থী অভিভাবক মতবিনিময় সভার বিজ্ঞপ্তি",
        downloadUrl: "",
    },
];

const noticeData = Array.from({ length: 100 }, (_, index) => {
    const notice = noticeTopics[index % noticeTopics.length];
    const date = new Date(Date.UTC(2026, 10, 4 - index));
    const noticeNumber = String(index + 1).padStart(3, "0");

    return {
        ...notice,
        id: index + 1,
        topic: `${notice.topic} — বিজ্ঞপ্তি ${noticeNumber}`,
        date: date.toISOString().slice(0, 10),
        views: ((index * 17 + 9) % 108) + 1,
        downloadUrl: index < noticeTopics.length ? notice.downloadUrl : "",
    };
});
