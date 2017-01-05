package me.skynda.auth.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import lombok.Data;

import javax.persistence.Table;

@Entity
@Data
@Table(name = "users")
public class User {

	@Id
	@Column(name = "id", columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String login;
	private String email;
	private String phone;
	private String password;
	private String language;
	private String firstName;
	private String lastName;
	private Boolean enabled;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_authority", joinColumns = { @JoinColumn(name = "user_id", referencedColumnName = "id") },
		inverseJoinColumns = { @JoinColumn(name = "authority_id", table = "authority", referencedColumnName = "id") })
    private List<Authority> authority;

}