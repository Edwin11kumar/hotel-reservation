package com.hotel.reservation.service;

import com.hotel.reservation.model.Hotel;
import com.hotel.reservation.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepo;

    public Hotel addHotel(Hotel hotel) {
        return hotelRepo.save(hotel);
    }

    public List<Hotel> getAllHotels() {
        return hotelRepo.findAll();
    }

    public void deleteHotel(Long id) {
        hotelRepo.deleteById(id);
    }

    public Hotel updateHotel(Long id, Hotel updated) {
        Hotel h = hotelRepo.findById(id).orElseThrow();
        h.setName(updated.getName());
        h.setLocation(updated.getLocation());
        h.setImageUrl(updated.getImageUrl());
        h.setTotalRooms(updated.getTotalRooms());
        h.setRoomType(updated.getRoomType());
        h.setPrice(updated.getPrice());
        return hotelRepo.save(h);
    }

    public List<Hotel> filterHotels(String roomType, String location, Double price) {
        if (roomType != null) return hotelRepo.findByRoomTypeContainingIgnoreCase(roomType);
        if (location != null) return hotelRepo.findByLocationContainingIgnoreCase(location);
        if (price != null) return hotelRepo.findByPriceLessThanEqual(price);
        return hotelRepo.findAll();
    }
}
