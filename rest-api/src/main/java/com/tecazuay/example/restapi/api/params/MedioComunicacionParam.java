package com.tecazuay.example.restapi.api.params;


import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class MedioComunicacionParam {

    @NotNull
    private Long medio_id;

    @NotNull
    private long ticket_id;

    public Long getMedio_id() {
        return medio_id;
    }

    public void setMedio_id(Long medio_id) {
        this.medio_id = medio_id;
    }

    public long getTicket_id() {
        return ticket_id;
    }

    public void setTicket_id(long ticket_id) {
        this.ticket_id = ticket_id;
    }

    
}
