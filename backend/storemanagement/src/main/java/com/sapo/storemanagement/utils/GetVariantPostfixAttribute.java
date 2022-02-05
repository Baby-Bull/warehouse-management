package com.sapo.storemanagement.utils;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class GetVariantPostfixAttribute {

    public static String capitalizeWord(String str){
        String words[]=str.split("\\s");
        String capitalizeWord="";
        for(String w:words){
            String first=w.substring(0,1);
            String afterFirst=w.substring(1);
            capitalizeWord+=first.toUpperCase()+afterFirst+" ";
        }
        return capitalizeWord.trim();
    }

    public static String removeAccent(String s) {

        String temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("");
    }

//    public static char getFirstChar(String s) {
//        return s.charAt(0);
//    }
//
    public static String addPrefix(String s) {
        return "-" + s;
    }

    public static String getVariantPostfixAttribute(String s) {
        return addPrefix(capitalizeWord(removeAccent(s)).replaceAll("\\s", ""));
    }
}
