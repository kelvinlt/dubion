package com.dubion.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A RatingBand.
 */
@Entity
@Table(name = "rating_band")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RatingBand implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @Column(name = "rating")
    private Integer rating;

    @ManyToOne
    private User user;

    @ManyToOne
    private Band band;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public RatingBand date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Integer getRating() {
        return rating;
    }

    public RatingBand rating(Integer rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public User getUser() {
        return user;
    }

    public RatingBand user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Band getBand() {
        return band;
    }

    public RatingBand band(Band band) {
        this.band = band;
        return this;
    }

    public void setBand(Band band) {
        this.band = band;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RatingBand ratingBand = (RatingBand) o;
        if (ratingBand.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ratingBand.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RatingBand{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", rating='" + getRating() + "'" +
            "}";
    }
}
