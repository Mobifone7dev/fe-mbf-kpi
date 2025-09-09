import { ChatGPTMessage } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function scrollToBottom(containerRef: React.RefObject<HTMLElement>) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild;
    if (lastMessage) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "end",
      };
      lastMessage.scrollIntoView(scrollOptions);
    }
  }
}

// Reference:
// github.com/hwchase17/langchainjs/blob/357d6fccfc78f1332b54d2302d92e12f0861c12c/examples/src/guides/expression_language/cookbook_conversational_retrieval.ts#L61
export const formatChatHistory = (chatHistory: [string, string][]) => {
  const formattedDialogueTurns = chatHistory.map(
    (dialogueTurn) => `Human: ${dialogueTurn[0]}\nAssistant: ${dialogueTurn[1]}`
  );

  return formattedDialogueTurns.join("\n");
};

export function formattedText(inputText: string) {
  return inputText
    .replace(/\n+/g, " ") // Replace multiple consecutive new lines with a single space
    .replace(/(\w) - (\w)/g, "$1$2") // Join hyphenated words together
    .replace(/\s+/g, " "); // Replace multiple consecutive spaces with a single space
}

// Default UI Message
export const initialMessages = [
  {
    role: "assistant",
    content:
      "Xin chào tôi là trợ lý Mobifone 7 của bạn. Mời bạn hỏi tôi về chính sách CSKH của MobiFone nhé",
  },
];

interface Data {
  sources: string[];
}

// Maps the sources with the right ai-message
export const getSources = (data: Data[], role: string, index: number) => {
  if (role === "assistant" && index >= 2 && (index - 2) % 2 === 0) {
    const sourcesIndex = (index - 2) / 2;
    if (data[sourcesIndex] && data[sourcesIndex].sources) {
      return data[sourcesIndex].sources;
    }
  }
  return [];
};

export const convertKeyToProvinceObject = (key: string) => {
  switch (key) {
    case "KHO": return { value: "KHO", label: "Khánh Hòa" };
    case "DLA": return { value: "DLA", label: "Đăk Lăk" };
    case "GLA": return { value: "GLA", label: "Gia Lai" };
    case "PYE": return { value: "PYE", label: "Phú Yên" };
    case "DNO": return { value: "DNO", label: "Đăk Nông" };
    case "KON": return { value: "KON", label: "Kon Tum" };
    case "CTY7": return { value: "CTY7", label: "VP Công ty" };

    default:
      return { value: "", label: "Không xác định" }
  }

}
export const formatCurrencyVND = (amount: number | null) => {
  if (amount === null || amount === undefined) {
    return "0 đ"; // Trả về giá trị mặc định nếu amount là null hoặc undefined
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0, // không hiển thị số lẻ
  }).format(amount);
}
export const getRanking = (array: number[], value: number): number | null => {
  if (!array.includes(value)) return null

  // Tạo mảng mới đã sắp xếp giảm dần
  const sorted = [...array].sort((a, b) => b - a)

  // Tìm vị trí đầu tiên của giá trị
  const rank = sorted.indexOf(value) + 1

  return rank
}

export const convertIndexToDate = (index: number) => {
  switch (index) {
    case 0:
      return "23/05";
    case 1:
      return "24/05";
    case 2:
      return "25/05";
    case 3:
      return "26/05";
    case 4:
      return "27/05";

    case 5:
      return "28/05";
    case 6:
      return "29/05";
    case 7:
      return "30/05";
    case 8:
      return "31/05";
    case 9:
      return "01/06";
    case 10:
      return "02/06";
    case 11:
      return "03/06";
    case 12:
      return "04/06";
    case 13:
      return "05/06";
    case 14:
      return "06/06";
    case 15:
      return "07/06";
    case 16:
      return "08/06";
    case 17:
      return "09/06";
    case 18:
      return "10/06";
    case 19:
      return "11/06";
    case 20:
      return "12/06";
    case 21:
      return "13/06";
    case 22:
      return "14/06";
    case 23:
      return "15/06";
    case 24:
      return "16/06";
    case 25:
      return "17/06";
    case 26:
      return "18/06";
    case 27:
      return "19/06";
    case 28:
      return "20/06";
    case 29:
      return "21/06";
    case 30:
      return "22/06";
    case 31:
      return "23/06";
    case 32:
      return "24/06";
    case 33:
      return "25/06";
    case 34:
      return "26/06";
    case 35:
      return "27/06";
    case 36:
      return "28/06";
    case 37:
      return "29/06";
    case 38:
      return "30/06";

    default:
      return ""
  }

}

export const convertIndexToDateM2M = (index: number) => {
  switch (index) {
    case 0:
      return "26/05";
    case 1:
      return "27/05";
    case 2:
      return "28/05";
    case 3:
      return "29/05";
    case 4:
      return "30/05";
    case 5:
      return "31/05";
    case 6:
      return "01/06";
    case 7:
      return "02/06";
    case 8:
      return "03/06";
    case 9:
      return "04/06";
    case 10:
      return "05/06";
    case 11:
      return "06/06";
    case 12:
      return "07/06";
    case 13:
      return "08/06";
    case 14:
      return "09/06";
    case 15:
      return "10/06";
    case 16:
      return "11/06";
    case 17:
      return "12/06";
    case 18:
      return "13/06";
    case 19:
      return "14/06";
    case 20:
      return "15/06";
    case 21:
      return "16/06";
    case 22:
      return "17/06";
    case 23:
      return "18/06";
    case 24:
      return "19/06";
    case 25:
      return "20/06";
    case 26:
      return "21/06";
    case 27:
      return "22/06";
    case 28:
      return "23/06";
    case 29:
      return "24/06";
    case 30:
      return "25/06";
    case 31:
      return "26/06";
    case 32:
      return "27/06";
    case 33:
      return "28/06";
    case 34:
      return "29/06";
    case 35:
      return "30/06";
    default:
      return ""
  }

}


export const convertIndexToDateCloud = (index: number) => {
  switch (index) {

    case 0:
      return "01/06";
    case 1:
      return "02/06";
    case 2:
      return "03/06";
    case 3:
      return "04/06";
    case 4:
      return "05/06";
    case 5:
      return "06/06";
    case 6:
      return "07/06";
    case 7:
      return "08/06";
    case 8:
      return "09/06";
    case 9:
      return "10/06";
    case 10:
      return "11/06";
    case 11:
      return "12/06";
    case 12:
      return "13/06";
    case 13:
      return "14/06";
    case 14:
      return "15/06";
    case 15:
      return "16/06";
    case 16:
      return "17/06";
    case 17:
      return "18/06";
    case 18:
      return "19/06";
    case 19:
      return "20/06";
    case 20:
      return "21/06";
    case 21:
      return "22/06";
    case 22:
      return "23/06";
    case 23:
      return "24/06";
    case 24:
      return "25/06";
    case 25:
      return "26/06";
    case 26:
      return "27/06";
    case 27:
      return "28/06";
    case 28:
      return "29/06";
    case 29:
      return "30/06";
    default:
      return ""
  }

}


export const convertIndexToDateIOT = (index: number) => {
  switch (index) {

    case 0:
      return "01/06";
    case 1:
      return "02/06";
    case 2:
      return "03/06";
    case 3:
      return "04/06";
    case 4:
      return "05/06";
    case 5:
      return "06/06";
    case 6:
      return "07/06";
    case 7:
      return "08/06";
    case 8:
      return "09/06";
    case 9:
      return "10/06";
    case 10:
      return "11/06";
    case 11:
      return "12/06";
    case 12:
      return "13/06";
    case 13:
      return "14/06";
    case 14:
      return "15/06";
    case 15:
      return "16/06";
    case 16:
      return "17/06";
    case 17:
      return "18/06";
    case 18:
      return "19/06";
    case 19:
      return "20/06";
    case 20:
      return "21/06";
    case 21:
      return "22/06";
    case 22:
      return "23/06";
    case 23:
      return "24/06";
    case 24:
      return "25/06";
    case 25:
      return "26/06";
    case 26:
      return "27/06";
    case 27:
      return "28/06";
    case 28:
      return "29/06";
    case 29:
      return "30/06";
    default:
      return ""
  }

}

export const convertIndexToDateLTT = (index: number) => {
  switch (index) {

    case 0:
      return "01/08";
    case 1:
      return "02/08";
    case 2:
      return "03/08";
    case 3:
      return "04/08";
    case 4:
      return "05/08";
    case 5:
      return "06/08";
    case 6:
      return "07/08";
    case 7:
      return "08/08";
    case 8:
      return "09/08";
    case 9:
      return "10/08";
    case 10:
      return "11/08";
    case 11:
      return "12/08";
    case 12:
      return "13/08";
    case 13:
      return "14/08";
    case 14:
      return "15/08";
    case 15:
      return "16/08";
    case 16:
      return "17/08";
    case 17:
      return "18/08";
    case 18:
      return "19/08";
    case 19:
      return "20/08";
    case 20:
      return "21/08";
    case 21:
      return "22/08";
    case 22:
      return "23/08";
    case 23:
      return "24/08";
    case 24:
      return "25/08";
    case 25:
      return "26/08";
    case 26:
      return "27/08";
    case 27:
      return "28/08";
    case 28:
      return "29/08";
    case 29:
      return "30/08";
    case 30:
      return "31/08";
    default:
      return ""
  }

}
export const convertIndexToDateCamera = (index: number) => {
  switch (index) {

    case 0:
      return "01/08";
    case 1:
      return "02/08";
    case 2:
      return "03/08";
    case 3:
      return "04/08";
    case 4:
      return "05/08";
    case 5:
      return "06/08";
    case 6:
      return "07/08";
    case 7:
      return "08/08";
    case 8:
      return "09/08";
    case 9:
      return "10/08";
    case 10:
      return "11/08";
    case 11:
      return "12/08";
    case 12:
      return "13/08";
    case 13:
      return "14/08";
    case 14:
      return "15/08";
    case 15:
      return "16/08";
    case 16:
      return "17/08";
    case 17:
      return "18/08";
    case 18:
      return "19/08";
    case 19:
      return "20/08";
    case 20:
      return "21/08";
    case 21:
      return "22/08";
    case 22:
      return "23/08";
    case 23:
      return "24/08";
    case 24:
      return "25/08";
    case 25:
      return "26/08";
    case 26:
      return "27/08";
    case 27:
      return "28/08";
    case 28:
      return "29/08";
    case 29:
      return "30/08";
    case 30:
      return "31/08";
    default:
      return ""
  }

}


